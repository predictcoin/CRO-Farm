import { expect } from "chai";
import { ethers, upgrades } from "hardhat"
import { Signer, Contract, BigNumber as _BigNumber, BigNumber, ContractFactory } from "ethers";

let signers: Signer[], 
  farm: Contract, 
  PrederA: Signer, 
  CRP: Contract,
  PrederB: Signer,
  lp1: Contract,
  Farm: ContractFactory,
  wallet: Contract,
  Wallet: ContractFactory;
const CRPPerBlock = 1000000000;
let walletContract: Contract;

type pool = {
  lpToken: string, 
  allocPoint: _BigNumber, 
  lastRewardBlock: _BigNumber, 
  accCRPPerShare: _BigNumber
};

let poolBefore: pool;

let [depositA, depositB] = [8883, 9248]
const multiplier = 10000000

describe("Farming Contract Tests", () => {

  beforeEach( async () => {
    signers = await ethers.getSigners();
    [PrederA, PrederB] = signers

    const _CRP = await ethers.getContractFactory("CROPredict");
    CRP = await _CRP.deploy();

    Wallet = await ethers.getContractFactory("MasterCRPWallet")
    wallet = await Wallet.deploy(CRP.address);

    Farm = await ethers.getContractFactory("MasterCRP");
    //farm = await Farm.deploy(CRP.address, CRPPerBlock, 0)
    farm = await upgrades.deployProxy(Farm, [CRP.address, CRPPerBlock, 0, wallet.address], {kind: "uups"})
    await wallet.setMasterCRP(farm.address);

    const Lp1 = await ethers.getContractFactory("LPToken1");
    lp1 = await Lp1.deploy()
  })

  it("should initialise contract state variables", async () => {
    expect(await farm.CRP()).to.equal(CRP.address)
    expect(await farm.CRPPerBlock()).to.equal(CRPPerBlock)
    expect(await farm.startBlock()).to.equal(0)
    expect(await farm.totalAllocPoint()).to.equal(200)
    expect(await farm.poolLength()).to.equal(1)
  })
  
  it("should add the Pred Token Pool", async () => {
    const pool = await farm.poolInfo(0)
    expect(pool.lpToken).to.equal(CRP.address)
    expect(pool.allocPoint.toString()).to.equal("200")
    expect(pool.lastRewardBlock.toString()).to.equal("0")
    expect(pool.accCRPPerShare.toString()).to.equal("0")
  })

  it("should update multiplier", async () => {
    await farm.updateMultiplier(multiplier)
    expect(await farm.BONUS_MULTIPLIER()).to.equal(multiplier)
  })

  it("should allow only owner add a new pool", async () => {
    await expect(farm.add(4000, PrederA, false, {from: PrederB})).to.be.reverted;
  })

  it("should add a new pool", async () => {
    const poolAddr = lp1.address
    await farm.add(4000, poolAddr, false)
    const pool = await farm.poolInfo(1)
    expect(pool.lpToken).to.equal(poolAddr)
    expect(pool.allocPoint.toString()).to.equal("4000")
    expect(pool.accCRPPerShare.toString()).to.equal("0")
  })

  it("should allow only owner set allocation point", async () => {
    await expect(farm.set(0, 10000000, false, {from: PrederB})).to.be.reverted
  })

  it("should set allocation point", async () => {
    await farm.set(0, 10000000, false)
    const pool = await farm.poolInfo(0)
    expect(pool.allocPoint).to.equal(10000000)
    expect(await farm.totalAllocPoint()).to.equal(10000000)
  })

  it("should allow only owner set migrator", async () => {
    await expect(farm.setMigrator(PrederA, {from: PrederB})).to.be.reverted
  })

  it("should set migrator", async () => {
    const migrator = await PrederB.getAddress()
    await farm.setMigrator(migrator)
    expect(await farm.migrator()).to.equal(migrator)
  })

  it("should return multiplier across blocks", async () => {
    const bonus_multiplier = await farm.BONUS_MULTIPLIER()
    expect(await farm.getMultiplier(110, 200)).to.be.equal(bonus_multiplier*(200-110))
  })

  context("when user deposits when wallet is empty", async () => {
    beforeEach(async () => {
      await CRP.approve(await farm.address, 100000000)
      await farm.updateMultiplier(multiplier)
      poolBefore = await farm.poolInfo(0)
      depositA = 1000;
      await farm.deposit(0, depositA)
    })

    it("should update user info", async () => {
      const userInfo = await farm.userInfo(0, await PrederA.getAddress())
      expect(userInfo.amount).to.equal(depositA)
      expect(userInfo.rewardDebt).to.equal(0)
      expect(await farm.totalRewardDebt()).to.equal(0)
      expect(await farm.pendingCRP(0, await PrederA.getAddress())).to.equal(0)
    })

    it("should update pool", async () => {
      const poolAfter = await farm.poolInfo(0)
      expect(poolAfter.lastRewardBlock).to.gt(poolBefore.lastRewardBlock)
      expect(poolAfter.accCRPPerShare).to.equal(poolBefore.accCRPPerShare)
    })
  
    it("should update user pending Pred when wallet increases balance", async () => {
      await CRP.transfer(wallet.address, (10**17).toString());
      await farm.updatePool(0)
      const user = await farm.userInfo(0, await PrederA.getAddress())
      const pool = await farm.poolInfo(0)
      const pending = (multiplier*CRPPerBlock).toString();
      expect(await farm.pendingCRP(0, await PrederA.getAddress()))
        .to.equal(
          user.amount.mul(pool.accCRPPerShare).div((BigNumber.from(10).pow(30))).sub(user.rewardDebt)
        )
    })

    it("should mass update pools", async () => {
      await CRP.transfer(wallet.address, (10**17).toString());
      const oldTotalRewardDebt = await farm.totalRewardDebt()
      const oldPool: pool = await farm.poolInfo(0)
      await farm.massUpdatePools()
      const newTotalRewardDebt = await farm.totalRewardDebt()
      const newPool: pool = await farm.poolInfo(0)
      const _multiplier = newPool.lastRewardBlock.sub(oldPool.lastRewardBlock).mul(multiplier)

      expect(oldTotalRewardDebt).to.equal(0)
      expect(newTotalRewardDebt, "TotalRewardDebt not correct").to.equal((_multiplier.mul(CRPPerBlock)).toString())
      expect(newPool.lastRewardBlock).to.equal(oldPool.lastRewardBlock.add(BigNumber.from(2)))
      expect(newPool.accCRPPerShare, "AccPredShare not correct").to.equal(
        oldPool.accCRPPerShare.add(
          _multiplier
          .mul(CRPPerBlock)
          .mul((BigNumber.from(10).pow(30)))
          .div(await CRP.balanceOf(farm.address))
        )
    )})

    it("it should withdraw user rewards with withdraw function", async () => {
      await CRP.transfer(wallet.address, (10**17).toString());
      const pending: BigNumber = await farm.pendingCRP(0, await PrederA.getAddress());
      let user = await farm.userInfo(0, await PrederA.getAddress())

      await expect(() => farm.withdraw(0, 0))
        .to.changeTokenBalances(
          CRP, [wallet, PrederA], [BigNumber.from(0).sub(pending.add(pending)), pending.add(pending)]
      )

      user = await farm.userInfo(0, await PrederA.getAddress())
      expect(user.amount).to.equal(depositA)
      expect(user.rewardDebt).to.equal(pending.mul(2))
      expect(await farm.pendingCRP(0, await PrederA.getAddress())).to.equal(0);
      expect(await farm.totalRewardDebt()).to.equal(0)
    })

    it("it should withdraw user rewards with deposit function", async () => {
      await CRP.transfer(wallet.address, (10**17).toString());
      const pending: BigNumber = await farm.pendingCRP(0, await PrederA.getAddress());

      await expect(() => farm.deposit(0, 0))
        .to.changeTokenBalances(
          CRP, [wallet, PrederA], [BigNumber.from(0).sub(pending.mul(2)), pending.mul(2)]
      )

      const user = await farm.userInfo(0, await PrederA.getAddress())
      //await farm.deposit(0, 0)

      expect(user.amount).to.equal(depositA)
      expect(user.rewardDebt).to.equal(pending.mul(2))
      
      expect(await farm.totalRewardDebt()).to.equal(0)
    })

    it("it should withdraw user balance and rewards", async () => {
      await CRP.transfer(wallet.address, (10**17).toString());
      const pending: BigNumber = await farm.pendingCRP(0, await PrederA.getAddress());
      let user = await farm.userInfo(0, await PrederA.getAddress())
      await farm.withdraw(0, depositA)
      user = await farm.userInfo(0, await PrederA.getAddress())

      await expect(() => farm.withdraw(0, depositA)
        .to.changeTokenBalances(
          CRP, [walletContract, PrederA], [BigNumber.from(0).sub(pending.mul(2)), pending.mul(2)]
        ))

      expect(user.amount, "Total amount not withdrawn").to.equal(0)
      expect(user.rewardDebt, "Reward debt not removed").to.equal(0)
      expect(await farm.totalRewardDebt(), "TotalRewardDebt not reduced properly").to.equal(0)
    })
  })

  context("when user deposits when wallet is not empty", async () => {
    beforeEach(async () => {
      await CRP.approve(await farm.address, 100000000)
      await farm.updateMultiplier(multiplier)
      poolBefore = await farm.poolInfo(0)
      await CRP.transfer(wallet.address, (10**17).toString());
      await farm.deposit(0, depositA)
    })

    it("should update user info", async () => {
      const userInfo = await farm.userInfo(0, await PrederA.getAddress())
      const pending = await farm.pendingCRP(0, await PrederA.getAddress());
      expect(userInfo.amount).to.equal(depositA)
      expect(userInfo.rewardDebt).to.equal(0)
      expect(await farm.totalRewardDebt()).to.equal(pending)
      expect(await farm.pendingCRP(0, await PrederA.getAddress())).to.equal(pending);
    })

    it("should update pool", async () => {
      await farm.updatePool(0)
      const poolAfter = await farm.poolInfo(0)

      expect(poolAfter.lastRewardBlock).to.gt(poolBefore.lastRewardBlock)
      expect(poolAfter.accCRPPerShare).to.equal(
        poolBefore.accCRPPerShare.add(
          BigNumber.from(multiplier)
          .mul(CRPPerBlock)
          .mul((BigNumber.from(10).pow(30)).toString())
          .div(await CRP.balanceOf(farm.address))
        )
      )
      expect(await farm.totalRewardDebt()).to.equal(
        BigNumber.from(multiplier)
        .mul(CRPPerBlock)
      )
    })
  })

  context("Compound rewards", () => {
    beforeEach(async () => {
      await CRP.approve(await farm.address, 100000000);
      await CRP.transfer(wallet.address, (10**17).toString());
      await farm.deposit(0, 1000);
      await farm.massUpdatePools();
    })
    it("should compound rewards", async () => {
      let pending: BigNumber = await farm.pendingCRP(0, await PrederA.getAddress());
      const deposit: BigNumber = (await farm.userInfo(0, await PrederA.getAddress())).amount;

      await expect(() => farm.compound())
        .to.changeTokenBalances(
          CRP, [wallet, farm], [BigNumber.from(0).sub(pending).mul(2), pending.mul(2)]
        )
      
      expect(pending).to.be.above(0);
      expect(await farm.pendingCRP(0, await PrederA.getAddress())).to.equal(0);
      expect((await farm.userInfo(0, await PrederA.getAddress())).amount)
        .to.equal(deposit.add(pending.mul(2)));
    })
  })

  context("when contract is paused", () => {
    beforeEach( async () => {
      await CRP.approve(await farm.address, 100000000)
      await farm.updateMultiplier(multiplier)
      await CRP.transfer(wallet.address, (10**17).toString());
      await farm.deposit(0, 1000)
      await farm.massUpdatePools()
      await farm.pause()
    })

    it("should allow Owner unpause contract", async () => {
      await farm.unpause()
      expect(await farm.paused()).to.equal(false)
    })

    it("should allow only Owner pause and unpause contract", async () => {
      await expect(farm.pause({from: PrederB})).to.be.reverted
      await expect(farm.unpause({from: PrederB})).to.be.reverted
    })

    it("should not allow user to deposit and withdraw funds", async () => {
      await expect(farm.deposit(0, 1000)).to.be.reverted
      await expect(farm.withdraw(0, 1000)).to.be.reverted
    })

    it("should withdraw funds and forfeit rewards with Emergency withdraw", async () => {
      const oldWalletBalance = await CRP.balanceOf(wallet.address)
      await farm.emergencyWithdraw(0);
      const user = await farm.userInfo(0, await PrederA.getAddress())
      
      expect(await CRP.balanceOf(wallet.address)).to.equal(oldWalletBalance)
      expect(await farm.totalRewardDebt()).to.equal(0)
      expect(user.amount).to.equal(0)
      expect(user.rewardDebt).to.equal(0)
    })
  })

  // context("Contract Upgrade Tests", async () => {
  //   it("should upgrade contract", async () => {
  //     const provider = ethers.getDefaultProvider()
  //     const oldImplementation = await provider.getStorageAt(wallet.address, 0);
  //     farm = await upgrades.upgradeProxy(farm.address, Farm);
  //     const newImplementation = await provider.getStorageAt(wallet.address, 0);

  //     expect(newImplementation).to.not.equal(oldImplementation)
  //     expect(await farm.pred()).to.equal(CRP.address)
  //     expect(await farm.CRPPerBlock()).to.equal(CRPPerBlock)
  //     expect(await farm.startBlock()).to.equal(0)
  //     expect(await farm.totalAllocPoint()).to.equal(200)
  //     expect(await farm.poolLength()).to.equal(1)
  //   })

  // })
})
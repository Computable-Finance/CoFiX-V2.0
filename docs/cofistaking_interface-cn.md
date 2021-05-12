# CoFiStakingRewards 合约

**Abstract:** 本文档梳理 CoFiStakingRewards 合约接口函数

&emsp;


### `totalSupply()`

**功能：** 读取总存入的 CoFi数量

**函数:** `totalSupply()`

**权限:** 
1. 任何人均可调用

**参数要求:**
1. 无

**返回值:**
1. 返回合约内总存入的 CoFi数量

### `balanceOf()`

**功能:** 返回指定用户地址下的资金总额

**调用时能否携带资金:** 否

**函数:** `balanceOf(account)`

   + `account` 给定地址,一般是某个用户地址

**权限:** 
1. 任何人均可调用

**参数要求:**
1. 无要求

**返回值:**
1. 返回指定用户地址下的资金总额



### `earned()`

**功能:** 查询用户收益

**调用时能否携带资金:** 否

**函数:** `earned(account)`

   + `account` 给定地址,一般是某个用户地址

**权限:**
1. 任何人都可以调用

**参数要求:**
1. 无

**返回值:**
1. 返回用户收益



### `stake()`

**功能:** 向 CofiStaking 合约存入指定数量的 CoFi

**调用时能否携带资金**: 否

**函数:** `stake(amount)`

   + `amount` 存入资金数量

**权限:**

1. 必须要在奖励更新完成后才可以调用

**参数要求:**

1. 当输入的数量为负数时,会返回错误: `"Cannot stake 0"`

**返回值:**
1. 无



### `stakeForOther()`

**功能:** 向 CofiStaking 合约为指定用户存入指定数量的 CoFi

**调用时能否携带资金**: 否

**函数:** `stakeForOther(other, amount)`

   + `other` 指定用户地址
   + `amount` 存入资金数量

**权限:**

1. 必须要在奖励更新完成后才可以调用

**参数要求:**

1. 当输入的数量为负数时,会返回错误: `"Cannot stake 0"`

**返回值:**

1. 无




### `withdraw()`
**功能:** 取出合约中的指定数量的 CoFi

**调用时能否携带资金:** 否

**函数:** `withdraw(amount)`

   + `amount` 存入资金数量

**权限:**
1. 必须要在奖励更新完成后才可以调用

**参数要求:**
1. 当输入的数量为负数时,会返回错误: `"Cannot withdraw 0"`

**返回值:**
1. 无


### `getReward()` 

**功能:** 提取用户地址下的所有奖励，同时将属于 Gov 的奖励取出给到 CoFiXDAO 合约用于回购 CoFi

**调用时能否携带资金:** 否

**函数:** `getReward()`

**权限:**
1. 必须在奖励更新后才可以调用函数

**参数要求:**
1. 无

**返回值:**
1. 无

### `exit()` 

**功能:** 取出存入合约中所有的 CoFi，提取用户地址下的所有奖励，同时将属于 Gov 的奖励取出给到 CoFiXDAO 合约用于回购 CoFi

**调用时能否携带资金:** 否

**函数:** `exit()`

**权限:**

1. 必须在奖励更新后才可以调用函数

**参数要求:**

1. 无

**返回值:**

1. 无
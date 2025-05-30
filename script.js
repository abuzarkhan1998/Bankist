'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const displayTransactions = function(movements){
  containerMovements.innerHTML = '';

  movements.forEach (function(move,i){
    const type = move > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
          <div class="movements__value">${move}€</div>
        </div>`;

        containerMovements.insertAdjacentHTML('afterbegin',html);
  })
}

displayTransactions(account1.movements);

const calcDisplayBalance = function(move)
{
  const balance = move.reduce((acc,cur)=>{
    return acc + cur;
  },0)
  // console.log(balance);
  labelBalance.innerHTML = `${balance}€`;
}

calcDisplayBalance(account1.movements);


const createUserNames = function(accs)
{
  accs.forEach(acc=>{
    acc.userName = acc.owner.split(' ').map(user=>user[0]).join('');
  })
}

createUserNames(accounts);



/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const euroToUSD= 1.1;

const movementsUsd = movements.map(function(mov)
{
  return mov * euroToUSD;
})

const movementsUsdArr = movements.map(mov=> mov * euroToUSD);

// console.log(movements);

// console.log(movementsUsdArr);

const negativeMovements = movements.filter(mov=>mov<0);
// console.log(negativeMovements);

/////////////////////////////////////////////////



// Challenge

// const checkDogs = function(arr1,arr2){
//   const slicedArr1 = arr1.slice();
//   slicedArr1.splice(0,1);
//   slicedArr1.splice(-2);
//   console.log(slicedArr1);
//   const concatArr = slicedArr1.concat(arr2);
//   concatArr.forEach(function(age,i)
// {
//   console.log(age>=3?`Dog number ${i+1} is an adult, and is ${age} years old` : `Dog number ${i+1} is still a puppy`);
// })
// }

// checkDogs([3, 5, 2, 12, 7],[4, 1, 15, 8, 3]);

// checkDogs([9, 16, 6, 8, 3],[10, 5, 6, 1, 4]);
/////////////////////////////////////////////////


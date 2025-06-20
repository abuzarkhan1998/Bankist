'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
// const account1 = {
//   owner: 'Jonas Schmedtmann',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: 'Jessica Davis',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const account3 = {
//   owner: 'Steven Thomas Williams',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: 'Sarah Smith',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

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

//Code starts here
let currentAccount;

const today = new Date();
// console.log(today);

const displayTransactions = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (move, i) {
    const type = move > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    // console.log(date);
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = `${date.getFullYear()}`.padStart(2, 0);
    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">${day}/${month}/${year}</div>
          <div class="movements__value">${move.toFixed(2)}€</div>
        </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
  // console.log(balance);
  labelBalance.innerHTML = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumIn.textContent = `${income.toFixed(2)} €`;

  const out = Math.abs(
    acc.movements.filter(mov => mov < 0).reduce((acc, cur) => acc + cur, 0)
  );
  labelSumOut.textContent = `${out.toFixed(2)} €`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(interest => interest > 1)
    .reduce((total, int) => total + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)} €`;
};

const createUserNames = function (accs) {
  accs.forEach(acc => {
    acc.userName = acc.owner
      .split(' ')
      .map(user => user[0])
      .join('');
  });
};

createUserNames(accounts);

const updateUI = function (acc) {
  displayTransactions(acc);

  calcDisplayBalance(acc);

  calcDisplaySummary(acc);
};

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.userName.toLowerCase() === inputLoginUsername.value.toLowerCase()
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log('Login');
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    const day = `${today.getDate()}`.padStart(2, 0);
    const month = `${today.getMonth() + 1}`.padStart(2, 0);
    const year = `${today.getFullYear()}`.padStart(2, 0);
    const hour = `${today.getHours()}`.padStart(2, 0);
    const minutes = `${today.getMinutes()}`.padStart(2, 0);
    labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minutes}`;

    containerApp.style.opacity = 1;

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const toAccount = accounts.find(
    a => a.userName.toLowerCase() === inputTransferTo.value.toLowerCase()
  );
  // console.log(toAccount);
  const amount = Number(inputTransferAmount.value);

  if (
    amount > 0 &&
    toAccount &&
    currentAccount?.balance >= amount &&
    toAccount?.userName !== currentAccount.userName
  ) {
    // console.log('transfer valid');
    currentAccount.movements.push(-amount);
    toAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    toAccount.movementsDates.push(new Date().toISOString());
    updateUI(currentAccount);
  }
  inputTransferTo.value = inputTransferAmount.value = '';
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const loanAmount = Math.floor(inputLoanAmount.value);
  if (
    loanAmount > 0 &&
    currentAccount.movements.some(mov => mov >= loanAmount * 0.1)
  ) {
    currentAccount.movements.push(loanAmount);
    currentAccount.movementsDates.push(new Date().toISOString());
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currentAccount.userName.toLowerCase() ===
      inputCloseUsername.value.toLowerCase() &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    // console.log("Deletion Successful");
    const index = accounts.findIndex(
      acc =>
        acc.userName.toLowerCase() === currentAccount.userName.toLowerCase()
    );

    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let isSorted = false;
btnSort.addEventListener('click', function () {
  displayTransactions(currentAccount, !isSorted);
  isSorted = !isSorted;
});

// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 1;

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const euroToUSD = 1.1;

const movementsUsd = movements.map(function (mov) {
  return mov * euroToUSD;
});

const movementsUsdArr = movements.map(mov => mov * euroToUSD);

// console.log(movements);

// console.log(movementsUsdArr);

const negativeMovements = movements.filter(mov => mov < 0);
// console.log(negativeMovements);

/////////////////////////////////////////////////

// Challenge1

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

// Challenge 2

const calcAverageHumanAge = function (dogs) {
  const humanAge = dogs.map(dogAge => {
    if (dogAge <= 2) {
      return 2 * dogAge;
    } else {
      return 16 + dogAge * 4;
    }
  });
  // console.log(adultAge);

  const adultAge = humanAge.filter(age => age >= 18);
  // console.log(adultAge);
  // console.log(adultAge.length)
  const totalAge = adultAge.reduce((acc, curr) => acc + curr, 0);

  return totalAge / adultAge.length;
};

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge( [16, 6, 10, 5, 6, 1, 4]));

// Challenge 3

const CalAvgHuman = arr =>
  arr
    .map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
    .filter(humanAge => humanAge >= 18)
    .reduce((acc, humanAge, i, arr) => acc + humanAge / arr.length, 0);

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge( [16, 6, 10, 5, 6, 1, 4]));

// let account;
// for (const acc of accounts)
// {
//   if(acc.owner === 'Jessica Davis')
//   {
//     account = acc;
//     break;
//   }
// }

// console.log(account);

//Challenge 4

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

dogs.forEach(dog => (dog.recommended = dog.weight ** 0.75 * 28));
//  console.log(dogs);

const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
//  console.log(sarahDog);
const isSarahRecommendedFood =
  sarahDog.curFood > sarahDog.recommended * 1.1
    ? 'Too much'
    : sarahDog.curFood < sarahDog.recommended * 0.9
    ? 'Too Little'
    : 'Perfect';
//  console.log(isSarahRecommendedFood);

const { ownersEatTooMuch, ownersEatTooLittle } = Object.groupBy(
  dogs,
  ({ curFood, recommended }) =>
    curFood > recommended * 1.1
      ? 'ownersEatTooMuch'
      : curFood < recommended * 0.9
      ? 'ownersEatTooLittle'
      : 'None'
);
//  console.log(ownersEatTooMuch,ownersEatTooLittle);

// ownersEatTooMuch.forEach(owner => console.log(`${owner.owners.join(' and ')} dogs eat too much`));
// ownersEatTooLittle.forEach(owner => console.log(`${owner.owners.join(' and ')} dogs eat too little`));

const isExactRecommended = dogs.some(dog => dog.curFood === dog.recommended);
// console.log(isExactRecommended);

const isOkayRecommended = dogs.some(
  dog =>
    dog.curFood < dog.recommended * 1.1 && dog.curFood > dog.recommended * 0.9
);
// console.log(isOkayRecommended);

const okayDogs = dogs.filter(
  dog =>
    dog.curFood < dog.recommended * 1.1 && dog.curFood > dog.recommended * 0.9
);
// console.log(okayDogs);

const SortedDogs = dogs.sort((a, b) => a.curFood - b.curFood);
// console.log(SortedDogs);

const groupedByOwnerCount = Object.groupBy(dogs, dog => dog.owners.length);
// console.log(groupedByOwnerCount);

const sortedDogsbyRecommended = dogs.toSorted(
  (a, b) => a.recommended - b.recommended
);
// console.log(sortedDogsbyRecommended);
// console.log(dogs)

/////////////////////////////////////////////////

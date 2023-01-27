const generateRandNumsArray = (count, max) => {
   const randomValueArr = [];

   while (randomValueArr.length < count) {
      const randomValue = Math.floor(Math.random() * (max + 1));
      if (randomValueArr.indexOf(randomValue) === -1) {
         randomValueArr.push(randomValue);
      }
   }

   return randomValueArr;
};

const generateRandomIdArr = (array, count) => {
   const randomIdArr = [];

   while (randomIdArr.length < count) {
      const randomIndex = Math.floor(Math.random() * (count + 1));
const randomId = array[randomIndex]
      if (randomIdArr.indexOf(randomId) === -1) {
        randomIdArr.push(randomId);
      }
   }

   return randomIdArr;
};

module.exports = {
   generateRandNumsArray,
   generateRandomIdArr,
};

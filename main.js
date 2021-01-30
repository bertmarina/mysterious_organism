// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//Factory function to create multiple objects
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,

    //The method takes a random base of the dna and substitutes it with another one but the same
    mutate() {
      const selectedBase = this.dna[
        Math.floor(Math.random() * this.dna.length)
      ];
      let dnaBases = ["A", "T", "C", "G"];
      dnaBases.splice(dnaBases.indexOf(selectedBase), 1);
      let mutatedBase = dnaBases[Math.floor(Math.random() * 3)];
      return this.dna.splice(selectedBase, 1, mutatedBase);
    },

    //The method compares the dnas of two P. Aequors and return the % of the the one they have in common
    compareDNA(otherPAequor) {
      let count = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === otherPAequor.dna[i]) {
          count++;
        }
      }
      const commonDNA = ((count / this.dna.length) * 100).toFixed(2);

      console.log(
        `Specimen #${this.specimenNum} and specimen #${otherPAequor.specimenNum} have ${commonDNA}% DNA in common.`
      );
    },

    //The method checks if a given P. Aequor can survive based on the % of bases C and G in the dna sequence
    willLikelySurvive() {
      let count = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === "C" || this.dna[i] === "G") {
          count++;
        }
      }
      if ((count * 100) / this.dna.length >= 60) {
        return true;
      } else {
        return false;
      }
    },
  };
};

let arrayPAequor = [];
let i = 0;

while (arrayPAequor.length < 30) {
  let newAEquor = pAequorFactory(i, mockUpStrand());
  if (newAEquor.willLikelySurvive() === true) {
    arrayPAequor.push(newAEquor);
  }
  i++;
}
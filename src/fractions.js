const FRACTIONS = [
	100000, 
	50000, 
	20000, 
	10000, 
	5000, 
	1000, 
	500, 
	100, 
	50
];

// Make sure the fraction is sorted from largest to smallest
FRACTIONS.sort( (f1, f2) => {
	if(f1 < f2) return 1;
	else if(f1 > f2) return -1;
	else return 0;
});

const MIN_FRACTIONS = FRACTIONS[FRACTIONS.length - 1];

export {FRACTIONS, MIN_FRACTIONS};
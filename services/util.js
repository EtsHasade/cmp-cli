export const getKababCase = (str) => {
    return str.split('').map((letter, idx) => {
        if (idx === 0) return letter.toLowerCase();
        const isUpper = (letter === letter.toUpperCase())
        return (isUpper) ? `-${letter.toLowerCase()}` : letter;
    }).join('');
}

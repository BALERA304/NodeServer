function generateID() {
    let id = '';
    const characters = '0123456789';

    do {
        for (let i = 0; i < 3; i++) {
            id += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    } while (usedIDs.includes(id));

    usedIDs.push(id);
    return id;
}

const usedIDs = [];

module.exports = generateID;
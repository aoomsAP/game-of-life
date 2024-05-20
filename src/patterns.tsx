export const birdPattern = (rows: number, columns: number) => {
    const birdPattern = [...Array(columns)].map(() => [...Array(rows)].map(() => 0));
    birdPattern[2][24] = 1;
    birdPattern[3][24] = 1;
    birdPattern[4][24] = 1;
    birdPattern[5][24] = 1;
    birdPattern[6][24] = 1;
    birdPattern[7][24] = 1;
    birdPattern[1][25] = 1;
    birdPattern[7][25] = 1;
    birdPattern[7][26] = 1;
    birdPattern[1][27] = 1;
    birdPattern[6][27] = 1;
    birdPattern[3][28] = 1;
    birdPattern[4][28] = 1;
    return birdPattern;
}

export const birdInfo = <>The <a href="https://conwaylife.com/wiki/Middleweight_spaceship" target="_blank">middleweight spaceship</a> was found by John Conway himself in 1970</>;

export const smallPattern = (rows: number, columns: number) => {
    const smallPattern = [...Array(columns)].map(() => [...Array(rows)].map(() => 0));
    smallPattern[22][24] = 1;
    smallPattern[23][24] = 1;
    smallPattern[24][24] = 1;
    smallPattern[26][24] = 1;
    smallPattern[27][24] = 1;
    smallPattern[28][24] = 1;
    smallPattern[22][25] = 1;
    smallPattern[28][25] = 1;
    smallPattern[22][26] = 1;
    smallPattern[23][26] = 1;
    smallPattern[24][26] = 1;
    smallPattern[26][26] = 1;
    smallPattern[27][26] = 1;
    smallPattern[28][26] = 1;
    return smallPattern;
}

export const smallInfo = undefined;

export const loopPattern = (rows: number, columns: number) => {
    const loopPattern = [...Array(columns)].map(() => [...Array(rows)].map(() => 0));
    loopPattern[19][21] = 1;
    loopPattern[19][22] = 1;
    loopPattern[19][23] = 1;
    loopPattern[19][27] = 1;
    loopPattern[19][28] = 1;
    loopPattern[19][29] = 1;

    loopPattern[24][21] = 1;
    loopPattern[24][22] = 1;
    loopPattern[24][23] = 1;
    loopPattern[24][27] = 1;
    loopPattern[24][28] = 1;
    loopPattern[24][29] = 1;

    loopPattern[21][19] = 1;
    loopPattern[22][19] = 1;
    loopPattern[23][19] = 1;
    loopPattern[27][19] = 1;
    loopPattern[28][19] = 1;
    loopPattern[29][19] = 1;

    loopPattern[21][24] = 1;
    loopPattern[22][24] = 1;
    loopPattern[23][24] = 1;
    loopPattern[27][24] = 1;
    loopPattern[28][24] = 1;
    loopPattern[29][24] = 1;

    loopPattern[21][26] = 1;
    loopPattern[22][26] = 1;
    loopPattern[23][26] = 1;
    loopPattern[27][26] = 1;
    loopPattern[28][26] = 1;
    loopPattern[29][26] = 1;
    
    loopPattern[21][31] = 1;
    loopPattern[22][31] = 1;
    loopPattern[23][31] = 1;
    loopPattern[27][31] = 1;
    loopPattern[28][31] = 1;
    loopPattern[29][31] = 1;

    loopPattern[26][21] = 1;
    loopPattern[26][22] = 1;
    loopPattern[26][23] = 1;
    loopPattern[26][27] = 1;
    loopPattern[26][28] = 1;
    loopPattern[26][29] = 1;

    loopPattern[31][21] = 1;
    loopPattern[31][22] = 1;
    loopPattern[31][23] = 1;
    loopPattern[31][27] = 1;
    loopPattern[31][28] = 1;
    loopPattern[31][29] = 1;
    return loopPattern;
}

export const loopInfo = <><a href="https://conwaylife.com/wiki/Pulsar" target="_blank">Pulsar</a> is an oscillating pattern found by John Conway in 1970</>;
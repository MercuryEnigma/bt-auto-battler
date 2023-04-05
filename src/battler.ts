import {Battle, Teams} from '@pkmn/sim';

const mySalamence = `Salamence (M) @ Leftovers
Ability: Intimidate
EVs: 252 Spe / 252 Atk / 6 HP
Adamant Nature
- Substitute
- Flamethrower
- Dragon Claw
- Earthquake
`;

const playerClaydol = `Claydol (M) @ Leftovers
Ability: Levitate
EVs: 252 HP / 252 Def / 6 SpD
Careful Nature
- Stealth Rock
- Rapid Spin
- Earthquake
- Toxic
`;



export function startNewBattle(): string {
    console.log(`Starting new battle`);
    const config = {formatid: "gen4ubers" as any};
    const battle = new Battle(config);
    
    const team1 = Teams.unpack(Teams.pack(Teams.import(mySalamence)));
    const team2 = Teams.unpack(Teams.pack(Teams.import(playerClaydol)));
    if (team1 === null || team2 === null) {
        return "Cannot parse teams";
    }

    battle.setPlayer('p1', {name: 'Player A', team: team1});
    let turns = 0;
    const p1Choices: string[] = [];
    const p2Choices: string[] = [];
    try {
        console.log(`Setting player 2`);
        battle.setPlayer('p2', {name: 'Player B', team: team2});
        console.log(`Battle started with: ${battle.sides}`);

        while (!battle.ended) {
            console.log(`${turns}: Trying to make choices`);
            const c1 = "move " + battle.p1.active[0].moves[Math.floor(Math.random() * 3)];
            console.log(`${turns}: P1 made choice ${c1}`);
            p1Choices.push(c1);
            const c2 = "move " + battle.p2.active[0].moves[Math.floor(Math.random() * 3)];
            console.log(`${turns}: P2 made choice ${c2}`);
            p2Choices.push(c2);
            turns += 1;
            console.log(`${turns}: Making choices ${c1} ${c2}`);
            battle.makeChoices(c1, c2);
            console.log(`${turns}: Made choices ${battle.turn} ${battle.ended}`);
        }
    } catch (e) {
        return "Error: " + e;
    }
    if (battle.winner === 'Player A') {
        return `P1: Player A won in ${turns} turns, with choices ${p1Choices} vs ${p2Choices}`;
    } else if (battle.winner === 'Player B') {
        return `P2: Player B won in ${turns} turns, with choices ${p2Choices} vs ${p1Choices}`;
    } else {
        return `${battle.winner} in ${turns} turns, with choices ${p1Choices} and ${p2Choices}`;
    }
}

const char = createKnight('K');
console.log(char.name);
console.log(char.life);

const monster = createLittleMonster();
console.log(monster.name);
console.log(monster.life);

stage.start(
    char,
    monster,
    document.querySelector('#char'),
    document.querySelector('#monster')
)
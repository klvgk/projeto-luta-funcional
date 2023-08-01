//##################
//####Characters####
//##################

//Classe inicial que todo personagem irá herdar;
const defaultCharacter = {
    name: '',
    life: 1,
    maxLife:1,
    attack: 0,
    defense: 0
};

//Criação do Knight;
const createKnight = (name) => {
    return{
        ...defaultCharacter,
        name,
        life: 100,
        maxLife: 100,
        attack: 10,
        defense: 8
    }
};

//Criação do Sorcerer;
const createSorcerer = (name) => {
    return {
        ...defaultCharacter,
        name,
        life: 50,
        maxLife: 50,
        attack: 14,
        defense: 3
    }
}

//Criação do Little Monster;
const createLittleMonster = () => {
    return {
        ...defaultCharacter,
        name: 'Little Monster',
        life: 40,
        maxLife: 40,
        attack: 4,
        defense: 4
    }
}

//Criação do Big Monster;
const createBigMonster = () => {
    return {
        ...defaultCharacter,
        name: 'Big Monster',
        life: 120,
        maxLife: 120,
        attack: 16,
        defense: 6
    }
}

//#####################################
//####Elementos que compõem a arena####
//#####################################
const stage = {
    fighter1: null,
    fighter2: null,
    fighter1El: null,
    fighter2El: null,

    //Inicializa o jogo;
    start(fighter1, fighter2, fighter1El, fighter2El){
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;

        /*
        Seleção dos botões de Attack, com EventListener que irá disparar
        a função doAttack() quando houver click;
        */
        this.fighter1El.querySelector('.attackButton').addEventListener('click', () => {
            this.doAttack(this.fighter1, this.fighter2)
        });
        this.fighter2El.querySelector('.attackButton').addEventListener('click', () => {
            this.doAttack(this.fighter2, this.fighter1)
        });

        //Atualiza a tela;
        this.update();
    },

    //Atualiza os elementos da tela;
    update() {
        //Fighter1;
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life}HP`;
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
        this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%`;
        //Fighter2;
        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life}HP`;
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
        this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`;
    },

    //Lógica por trás do calculo de Ataque e Defesa;
    doAttack(attacking, attacked) {
        console.log(`${attacking.name} atacando ${attacked.name}`);

        this.update();
    }
}
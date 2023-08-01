//##################
//####Characters####
//##################

//Classe inicial que todo personagem irá herdar;
const defaultCharacter = {
    name: '',
    life: 1,
    maxLife: 1,
    attack: 0,
    defense: 0
};

//Criação do Knight;
const createKnight = (name) => {
    return {
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
    start(fighter1, fighter2, fighter1El, fighter2El) {
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
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)} HP`;
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
        this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%`;
        //Fighter2;
        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(1)} HP`;
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
        this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`;
    },

    //Lógica por trás do calculo de Ataque e Defesa;
    doAttack(attacking, attacked) {

        //Verifica se o ataque foi feito em/por um personagem que já morreu;
        if (attacking.life <= 0 && attacked.life > 0) {
            log.addMessage('Mortos não lutam!');
            return;
        } else if (attacking.life > 0 && attacked.life <= 0) {
            log.addMessage('Respeite os mortos!');
        }

        //Algoritmo que calcula o Fator de Ataque/Defesa dos personagens;
        const attackFactor = (Math.random() * 2).toFixed(2);
        const defenseFactor = (Math.random() * 2).toFixed(2);

        /*
        Ataque e Defesa atuais, que são o Ataque/Defesa dos personagens,
        multiplicados pelo Fator de Ataque/Defesa dos personagens;
        */
        let actualAttack = (attacking.attack * attackFactor).toFixed(1);
        let actualDefense = (attacked.defense * defenseFactor).toFixed(1);

        //Verificação se o Atacante/Atacado estão vivos e diminui o HP do personagem;
        if (attacking.life > 0 && attacked.life > 0) {
            //Verificação se o Ataque foi Defendido ou teve Exito;
            if (actualAttack > actualDefense) {
                attacked.life -= actualAttack;
                log.addMessage(`${attacking.name} causou ${actualAttack} de Dano em ${attacked.name}..`);
            } else {
                log.addMessage(`${attacked.name} defendeu o ataque de ${attacking.name}..`);
            }
        }

        //Atualiza os elementos da tela com os novos status.
        this.update();
    }
}

//Joga a narração da luta na tela;
const log = {
    list: [],
    addMessage(msg) {
        this.list.push(msg);
        this.render();
    },
    render() {
        const logEl = document.querySelector('.log');
        logEl.innerHTML = '';

        for (let i in this.list) {
            logEl.innerHTML += `<li>${this.list[i]}</li>`;
        }
    },
}
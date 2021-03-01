function randomNumber(min, max){
    return Math.floor(Math.random() * (max - min )) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            turns: 0,
            winner: null,
            logMessages: [],
        };
    },
    
    computed: {
        monsterHealthBar() {
            if (this.monsterHealth <= 0) {
                return {width: '0%'};
            }
            return {width: this.monsterHealth + '%'};
        },

        playerHealthBar() {
            if (this.playerHealth <= 0) {
                return {width: '0%'};
            }
            return {width: this.playerHealth + '%'};
        },

        maySpecialAttack() {
            return this.turns % 3 !==0;
        }
    },

    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth < 0) {
                this.winner = "draw"
            }else if (value <= 0) {
                this.winner = "monster"
            }
        },

        monsterHealth(value) {
            if (value <=0 && this.playerHealth < 0) {
                this.winner = "draw"
            }else if (value <=0) {
                this.winner = "player"
            }
        },
    },

    methods: {
        newGame(){
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = 0;
            this.winner = null;
            this.logMessages = [];
        },

        attackMonster() {
            this.turns++;
            const attackValue = randomNumber(5, 12);
            this.monsterHealth -= attackValue;
            this.addLog("player", "attack", attackValue);
            this.attackPlayer();
        },

        attackPlayer() {
            const attackValue = randomNumber(8, 15);
            this.playerHealth -= attackValue;
            this.addLog("monster", "attack", attackValue);
        },

        specialAttack() {
            this.turns++;
            const attackValue = randomNumber(10, 25);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            this.addLog("player", "attack", attackValue);
        },

        healPlayer() {
            this.turns++;
            const healValue = randomNumber(8, 20);
            if (this.playerHealth + healValue > 100){
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            };
            this.attackPlayer();
            this.addLog("player", "heal", healValue);
        },

        surrender() {
            this.playerHealth = 0;
        },

        addLog(actor, action, value) {
            this.logMessages.unshift({
                actionBy: actor,
                actionType: action,
                actionValue: value
            });
        }

    }
});

app.mount("#game");
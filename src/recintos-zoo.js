class RecintosZoo {

    ZOOLOGICO_INICIAL = [
        {
            numero: 1, 
            bioma: ['savana'], 
            tamanhoTotal: 10, 
            animaisExistentes: [{ quantidade: 3, animal: 'macaco' }]
        },
        {
            numero: 2, 
            bioma: ['floresta'], 
            tamanhoTotal: 5, 
            animaisExistentes: [{ quantidade: 0 }]
        },
        {
            numero: 3, 
            bioma: ['savana', 'rio'], 
            tamanhoTotal: 7, 
            animaisExistentes: [{ quantidade: 1, animal: 'gazela' }]
        },
        {
            numero: 4, 
            bioma: ['rio'], 
            tamanhoTotal: 8, 
            animaisExistentes: [{ quantidade: 0 }]
        },
        {
            numero: 5, 
            bioma: ['savana'], 
            tamanhoTotal: 9, 
            animaisExistentes: [{ quantidade: 1, animal: 'leão' }]
        }
    ];

    ANIMAIS_PERMITIDOS = {
        LEAO: { tamanho: 3, bioma: ['savana'], carnivoro: true },
        LEOPARDO: { tamanho: 2, bioma: ['savana'], carnivoro: true },
        CROCODILO: { tamanho: 3, bioma: ['rio'], carnivoro: true },
        MACACO: { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },  
        GAZELA: { tamanho: 2, bioma: ['savana'], carnivoro: false },
        HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false}
    };
    


    analisaRecintos(animal, quantidade) {
        if (!this.ANIMAIS_PERMITIDOS[animal] || quantidade <= 0) {
            return {
                erro: !this.ANIMAIS_PERMITIDOS[animal]
                    ? 'Animal inválido'
                    : 'Quantidade inválida'
            };
        }
        
        let biomasPermitidos = this.ANIMAIS_PERMITIDOS[animal].bioma;
        let recintoFinal = [];
        let biomaEncontrado;
        let tamanhoPermitido;
        let isCarnivoro = this.ANIMAIS_PERMITIDOS[animal].carnivoro;
        let animalExistenteUpper;
        let animalExistenteInfo;
    
        this.ZOOLOGICO_INICIAL.forEach(recinto => {
            biomaEncontrado = biomasPermitidos.some(biomaPermitido => recinto.bioma.includes(biomaPermitido));
            tamanhoPermitido = recinto.tamanhoTotal - (quantidade * this.ANIMAIS_PERMITIDOS[animal].tamanho);
        
            if (tamanhoPermitido > 0 && biomaEncontrado) {
                const conflito = recinto.animaisExistentes.some(animalExistente => {
                    if (animalExistente && animalExistente.animal) {
                        animalExistenteUpper = animalExistente.animal.toUpperCase()
                            .normalize('NFD').replace(/[\u0300-\u036f]/g, '');   
                        animalExistenteInfo = this.ANIMAIS_PERMITIDOS[animalExistenteUpper];
                        
                        return animalExistenteInfo && (animalExistenteInfo.carnivoro && !isCarnivoro || !animalExistenteInfo.carnivoro && isCarnivoro);
                    }
                    return false;
                });
        
                if (!conflito) {
                    let totalEspacoOcupado = quantidade * this.ANIMAIS_PERMITIDOS[animal].tamanho;
                    
                    let espacoExistente = recinto.animaisExistentes.reduce((total, animalExistente) => {
                        if (animalExistente && animalExistente.animal) {
                            animalExistenteInfo && (total += animalExistente.quantidade * animalExistenteInfo.tamanho)
                        }
                        return total;
                    }, 0);
    
                    let espacoExtra = (recinto.animaisExistentes.length >= 1 && animal !== animalExistenteUpper) ? (recinto.animaisExistentes[0].quantidade ) : 0;

                    let tamanhoRestante = recinto.tamanhoTotal - totalEspacoOcupado - espacoExistente -espacoExtra;
          
                    recintoFinal.push(`Recinto ${recinto.numero} (espaço livre: ${tamanhoRestante} total: ${recinto.tamanhoTotal})`);
                }
            }
        });
    
        if (recintoFinal.length > 0) {
            return { recintosViaveis: recintoFinal };
        }
        return { erro: 'Não há recinto viável' };
    }
}

export { RecintosZoo as RecintosZoo };


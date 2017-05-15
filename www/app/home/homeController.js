angular.module('homeController', []).controller("homeController", function ($scope) {
    //ler arquivo
    $scope.programa1 = function ($fileContent) { //carrega programa 1
        var list = $fileContent;
        var array = list.split('-');
        var parada = null;

        $scope.listInstrucoesRotuladasP1 = getInstrucoes(array);
        var arrayAux = $scope.listInstrucoesRotuladasP1;
        parada = arrayAux.length;
        $scope.passo1P1 = passo1(arrayAux, parada);
        var rotuloList = $scope.passo1P1;
        $scope.passo2P1 = passo2(rotuloList);
        var aux = $scope.passo2P1.length - 1;
        $scope.passo2P1.push('A' + aux);
        $scope.passo3P1 = passo3(rotuloList);
    };

    $scope.programa2 = function ($fileContent) { // carrega programa 2
        var list = $fileContent;
        var array = list.split('-');
        var parada = null;

        $scope.listInstrucoesRotuladasP2 = getInstrucoes(array);
        var arrayAux = $scope.listInstrucoesRotuladasP2;
        parada = arrayAux.length;
        $scope.passo1P2 = passo1(arrayAux, parada);
        var rotuloList = $scope.passo1P2;
        $scope.passo2P2 = passo2(rotuloList);
        var aux = $scope.passo2P2.length - 1;
        $scope.passo2P2.push('A' + aux);
        $scope.passo3P2 = passo3(rotuloList);
    };

    var getInstrucoes = function (array) {
        var arrayInstrucoesRotuladas = [];
        for (var index = 0; index < array.length - 1; index++) {
            var element = array[index];
            arrayInstrucoesRotuladas.push(element);
            console.log(element);
        }
        return arrayInstrucoesRotuladas;
    }

    var separarRotulos = function (arrayAux) {
        var arrayRotulos = [];
        for (var index = 0; index < arrayAux.length; index++) {
            var element = arrayAux[index];
            var rotuloAux = element.split(' ');
            var rotulos = {};
            rotulos.rotuto = rotuloAux[0];
            rotulos.teste = rotuloAux[2];
            rotulos.opV = rotuloAux[5];
            rotulos.rtV = rotuloAux[8];
            rotulos.opF = rotuloAux[11];
            rotulos.rtF = rotuloAux[14];
            arrayRotulos.push(rotulos);
            console.log(arrayPasso1)
        }
        return arrayRotulos;
    }

    // PASSO 1
    var passo1 = function name(arrayAux, parada) {
        var arrayPasso1 = [];
        for (var index = 0; index < arrayAux.length; index++) {
            var element = arrayAux[index];
            var rotuloAux = element.split(' ');
            var item = {};
            item.rotuto = parseInt(rotuloAux[0]);
            item.Verdadeiro = parseInt(rotuloAux[8]);
            item.Falso = parseInt(rotuloAux[14]);
            if (item.Verdadeiro > parada) { // identifica parada lado verdadeiro
                item.Verdadeiro = "(parada,&)";
                arrayPasso1.rotutoParada = item.rotuto;
            } else {
                item.Verdadeiro = '(' + rotuloAux[5] + ',' + rotuloAux[8] + ')';
            }
            if (item.Falso > parada) { // identifica parada falso
                item.Falso = "(parada,&)";
                arrayPasso1.rotutoParada = item.rotuto;
            } else {
                item.Falso = '(' + rotuloAux[11] + ',' + rotuloAux[14] + ')';
            }
            if (item.Verdadeiro === '(parada,&)' || item.Falso === '(parada,&)') {
                item.rotuloParada = item.rotuto + ' ' + item.Verdadeiro + ' ' + item.Falso;
                arrayPasso1.rotuloParada = item.rotuloParada;
            }
            arrayPasso1.push(item.rotuto + ' ' + item.Verdadeiro + ' ' + item.Falso);
            console.log(arrayPasso1)
        }
        return arrayPasso1;
    }

    // PASSO 2
    var passo2 = function (rotuloList) {
        var arrayPasso2 = [];
        var stringConcat = "€";
        var stringParada = rotuloList.rotuloParada;
        var rotuloInicio = rotuloList.rotutoParada - 1;
        var paradaAux = 0;
        var achouIgual = false;
        var remover = null;

        for (var index = rotuloInicio; index >= 0; index--) { // verifica se tem outro rotulo igual a ele mesmo, inicia sempre na parada do fim para o inicio
            var item1 = rotuloList[index];
            if (item1 !== remover || index >= rotuloInicio) { // impede que rotulos removidos sejam comparados novamente
                var array = item1.split(' ');
                var strinConcatenada = "";
                var itemVerificar1 = strinConcatenada.concat(array[1], array[2]);

                if (index === rotuloInicio) { // inclui o rutulo de parada ja conhecido na lista
                    arrayPasso2.push('{€}');
                }

                for (var x = 0; x < rotuloInicio; x++) { // for que compara o indice anterior com todos itens da lista tentando encontrar algum rotulo igual e incluir na lista
                    var item2 = rotuloList[x];
                    var array2 = item2.split(' '); // quebra o item2 em partes
                    var strinConcatenada2 = "";
                    var itemVerificar2 = strinConcatenada2.concat(array2[1], array2[2]);

                    if (itemVerificar1 === itemVerificar2 && array[0] !== array2[0]) { // compara os rotulos sucessores se tiver igual ignorando rotulos iguais
                        achouIgual = true;
                        stringConcat = stringConcat.concat(',', array2[0]); // concatena rotulos caso tiver um igual ao procurado
                        remover = item2;
                    }
                }
                if (achouIgual) { // apos acabar o for verifica se achou iguais
                    stringConcat = stringConcat.concat(',', array[0]); //adiciona o rotulo de referencia na lista
                    var stringReversa = stringConcat.split('').reverse().join(''); //inverte a string e adiciona na lista
                    arrayPasso2.push('{' + stringReversa + '}');
                    achouIgual = false;
                    console.log(stringReversa)
                } else {
                    stringConcat = stringConcat.concat(',', array[0]);
                    var stringReversa = stringConcat.split('').reverse().join(''); //inverte a string e adiciona na lista
                    arrayPasso2.push('{' + stringReversa + '}');
                    console.log(stringReversa)
                }
            }
        }
        return arrayPasso2;
    }

    // PASSO 3
    var passo3 = function (rotuloList) {
        var arrayRotulos = angular.copy(rotuloList);
        arrayRotulos.rotuloParada = rotuloList.rotuloParada;
        var removerRotulos = [];
        var stringParada = arrayRotulos.rotuloParada;
        for (var index = 0; index < arrayRotulos.length; index++) { // for para identificar parada
            var element = arrayRotulos[index];
            if (element === stringParada) { // identifica parada
                if (index < arrayRotulos.length) { //caso tenha rotulos fora do limite do programa
                    for (var x = index + 1; x < arrayRotulos.length; x++) {
                        var item = arrayRotulos[x]; // pega rotulo do primeiro item abaixo da parada
                        removerRotulos.push(arrayRotulos.indexOf(item));
                        var rotuloRemover = item.charAt(0); // pega o rotulo a ser removido
                        for (var y = 0; y < arrayRotulos.length; y++) { // percorre a lista para encontrar os rotulos
                            var item2 = arrayRotulos[y];
                            var arrayItens = arrayRotulos[y].split(' ');
                            var rtV = item2.charAt(5); // rotulo lado verdadeiro
                            var rtF = item2.charAt(11); // rotulo lado falso

                            if (rtV === rotuloRemover) {
                                var itemSubstituirV = arrayItens[1];
                                arrayRotulos[y] = arrayRotulos[y].replace(itemSubstituirV, '(ciclo,w)');
                            } else if (rtF === rotuloRemover) {
                                var itemSubstituirF = arrayItens[2];
                                arrayRotulos[y] = arrayRotulos[y].replace(itemSubstituirF, '(ciclo,w)');
                            }
                        }
                    }
                }
            }
        }
        //remove rotulos a baixo da parda
        for (var z = 0; z < arrayRotulos.length; z++) {
            var item1 = arrayRotulos[z];
            var rotuloRemover = parseInt(item1.charAt(0));
            for (var h = 0; h < removerRotulos.length; h++) {
                var item2 = removerRotulos[h];
                if (rotuloRemover === item2) {
                    arrayRotulos.splice(rotuloRemover, removerRotulos.length);
                }
            }
        }
        return arrayRotulos;
    }
})
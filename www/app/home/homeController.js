angular.module('homeController', []).controller("homeController", function ($scope) {
    //ler arquivo
    $scope.programa1 = function ($fileContent) { //carrega programa 1
        var list = $fileContent;
        var array = list.split('-');
        var parada = null;

        $scope.listInstrucoesRotuladasP1 = getInstrucoes(array);
        var arrayAux = $scope.listInstrucoesRotuladasP1;
        parada = getParada(arrayAux); // identifica parada rotulo de parada
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
        parada = getParada(arrayAux); // identifica parada rotulo de parada
        $scope.passo1P2 = passo1(arrayAux, parada);
        var rotuloList = $scope.passo1P2;
        $scope.passo2P2 = passo2(rotuloList);
        var aux = $scope.passo2P2.length - 1;
        $scope.passo2P2.push('A' + aux);
        $scope.passo3P2 = passo3(rotuloList);
        $scope.programasUnidos = getPasso4($scope.passo3P1, $scope.passo3P2);
    };

    var getPasso4 = function (p1, p2) {
        var listaPasso4 = [];
        for (var x = 0; x < p1.length; x++) { // remover string de ciclo
            var element = p1[x];
            var indiceLista = p1.indexOf(element);
            var stringCiclo = 'w: (ciclo, w) (ciclo, w)';
            if (stringCiclo === element) {
                p1.splice(indiceLista, 1);
                x = p1.length;
            } else {
                listaPasso4.push(element);
            }
        }

        for (var y = 0; y < p2.length; y++) { // remover string de ciclo
            var element = p2[y];
            var element = p2[y];
            var indiceLista = p2.indexOf(element);
            var stringCiclo = 'w: (ciclo, w) (ciclo, w)';
            if (stringCiclo === element) {
                p2.splice(indiceLista, 1);
                x = p2.length;
            } else {
                listaPasso4.push(element);
            }
        }
        listaPasso4.push('w: (ciclo, w) (ciclo, w)');
        return listaPasso4;
    }

    var getInstrucoes = function (array) { // funcao para retornar todas as instrucoes do programa
        var arrayInstrucoesRotuladas = [];
        for (var index = 0; index < array.length - 1; index++) {
            var element = array[index];
            arrayInstrucoesRotuladas.push(element);
            console.log(element);
        }
        return arrayInstrucoesRotuladas;
    }

    var getParada = function (arrayAux) { // funcao para identificar a parada do programa
        var arrayRotulos = [];
        var maiorRotulo = 0;
        for (var index = 0; index < arrayAux.length; index++) {
            var element = arrayAux[index];
            var rotuloAux = element.split(' ');
            arrayRotulos.push(rotuloAux[8]);
            arrayRotulos.push(rotuloAux[14]);
            if (index === arrayAux.length - 1) {
                maiorRotulo = parseInt(rotuloAux[0]);
            }
        }
        var maior = arrayRotulos.sort(function (a, b) { return b - a });
        if (maior[0] > maiorRotulo) { // pega o maior rotulo
            maiorRotulo = parseInt(maior[0]);
        }
        return maiorRotulo;
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
            if (item.Verdadeiro >= parada) { // identifica parada lado verdadeiro
                item.Verdadeiro = "(parada,&)";
                arrayPasso1.rotutoParada = item.rotuto;
            } else {
                item.Verdadeiro = '(' + rotuloAux[5] + ',' + rotuloAux[8] + ')';
            }
            if (item.Falso >= parada) { // identifica parada falso
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
        var rotuloInicio = rotuloList.indexOf(stringParada);
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
                    var itensSttring = stringConcat.split(',');
                    itensSttring = itensSttring.sort(function (a, b) { return a - b });
                    var i = itensSttring[0];
                    itensSttring.splice(i, 1);
                    itensSttring.push(i);
                    var stringReversa = itensSttring.toString();
                    // var stringReversa = stringConcat.split('').reverse().join(''); //inverte a string e adiciona na lista
                    arrayPasso2.push('{' + stringReversa + '}');
                    achouIgual = false;
                    console.log(stringReversa)
                } else {
                    stringConcat = stringConcat.concat(',', array[0]);
                    var itensSttring = stringConcat.split(',');
                    itensSttring = itensSttring.sort(function (a, b) { return a - b });
                    var i = itensSttring[0];
                    itensSttring.splice(i, 1);
                    itensSttring.push(i);
                    var stringReversa = itensSttring.toString();
                    // var stringReversa = stringConcat.split('').reverse().join(''); //inverte a string e adiciona na lista
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
        var temSimplificacao = false;
        var stringParada = arrayRotulos.rotuloParada;
        for (var index = 0; index < arrayRotulos.length; index++) { // for para identificar parada
            var element = arrayRotulos[index];
            if (element === stringParada) { // identifica parada
                if (index < arrayRotulos.length) { //caso tenha rotulos fora do limite do programa
                    for (var x = index + 1; x < arrayRotulos.length; x++) {
                        var item = arrayRotulos[x]; // pega rotulo do primeiro item abaixo da parada
                        var a = item.split(' ');
                        a = a[0];
                        removerRotulos.push(a);
                        // var rotuloRemover = item.charAt(0); // pega o rotulo a ser removido
                        var rotuloRemover = item.split(' ');
                        rotuloRemover = rotuloRemover[0];
                        for (var y = 0; y < arrayRotulos.length; y++) { // percorre a lista para encontrar os rotulos
                            var item2 = arrayRotulos[y];
                            var arrayItens = arrayRotulos[y].split(' ');
                            var aux1 = item2.split(' ');
                            var aux2 = aux1[0].split('');
                            if (aux2.length > 1) { // rotulos maiores que dois digitos
                                var rtV = item2.charAt(6); // rotulo lado verdadeiro
                                rtV = rtV.concat(item2.charAt(7)); // rotulo lado verdadeiro
                                var rtF = item2.charAt(13); // rotulo lado falso
                                rtF = rtF.concat(item2.charAt(14)); // rotulo lado falso
                            } else {
                                var rtV = item2.charAt(5); // rotulo lado verdadeiro
                                var rtF = item2.charAt(11); // rotulo lado falso
                            }

                            if (rtV === rotuloRemover) {
                                var itemSubstituirV = arrayItens[1];
                                arrayRotulos[y] = arrayRotulos[y].replace(itemSubstituirV, '(ciclo,w)');
                                temSimplificacao = true;
                            } else if (rtF === rotuloRemover) {
                                var itemSubstituirF = arrayItens[2];
                                arrayRotulos[y] = arrayRotulos[y].replace(itemSubstituirF, '(ciclo,w)');
                                temSimplificacao = true;
                            }
                        }
                    }
                }
            }
        }
        //remove rotulos a baixo da parda
        for (var z = 0; z < arrayRotulos.length; z++) {
            var item1 = arrayRotulos[z];
            var aux = item1.split(' ');
            var i = aux[0].split('');
            if (i.length > 1) { // numero de dois digitos
                var rotuloRemover = (item1.charAt(0));
                rotuloRemover = rotuloRemover.concat(item1.charAt(1));
                rotuloRemover = parseInt(rotuloRemover);
            } else { // numero de um digito
                var rotuloRemover = parseInt(item1.charAt(0));
            }
            for (var h = 0; h < removerRotulos.length; h++) {
                var item2 = parseInt(removerRotulos[h]);
                if (rotuloRemover === item2) {
                    for (var x = 0; x < arrayRotulos.length; x++) {
                        var element = arrayRotulos[x];
                        var indice = arrayRotulos.indexOf(element);
                        element = element.split(' ');
                        element = parseInt(element);
                        if (element === rotuloRemover) {
                            arrayRotulos.splice(indice, removerRotulos.length);
                            x = arrayRotulos.length;
                        }
                    }
                }
            }
        }
        if (temSimplificacao) {
            arrayRotulos.push('w: (ciclo, w) (ciclo, w)');
        }
        return arrayRotulos;
    }

    //PASSO 4
    $scope.passo4 = function () {
        var rotuloListPrograma1 = $scope.passo3P1;
        var rotuloListPrograma2 = $scope.passo3P2;
        var lista = [];

        for (var x = 0; x < rotuloListPrograma1.length; x++) { // remove rotulos iguais
            console.log('x: ' + x);
            var element1 = rotuloListPrograma1[x];
            var array = element1.split(' ');
            var stringItem1 = array[1] + array[2];
            var index = rotuloListPrograma1.indexOf(element1);
            for (var y = 0; y < rotuloListPrograma1.length; y++) {
                console.log('y: ' + (y));
                var element2 = rotuloListPrograma1[y];
                var array2 = element2.split(' ');
                var stringItem2 = array2[1] + array2[2];
                var index2 = rotuloListPrograma1.indexOf(element2);
                if (stringItem1 === stringItem2 && index !== index2) { //verifica rotulos iguais programa 1
                    rotuloListPrograma1.splice(index, 1);
                }
            }
        }

        for (var x = 0; x < rotuloListPrograma2.length; x++) { // remove rotulos iguais
            var element1 = rotuloListPrograma2[x];
            var array = element1.split(' ');
            var stringItem1 = array[1] + array[2];
            var index = rotuloListPrograma2.indexOf(element1);
            for (var y = 0; y < rotuloListPrograma2.length; y++) {
                var element2 = rotuloListPrograma2[y];
                var array2 = element2.split(' ');
                var stringItem2 = array2[1] + array2[2];
                var index2 = rotuloListPrograma2.indexOf(element2);
                if (stringItem1 === stringItem2 && index !== index2) { //verifica rotulos iguais programa 2
                    rotuloListPrograma2.splice(index, 1);
                }
            }
        }
        var aux = rotuloListPrograma1[0].split(' '); // priemiro rotulo de cada programa
        var aux2 = rotuloListPrograma2[0].split(' ');
        lista.push('{(' + aux[0] + ',' + aux2[0] + '})');

        for (var x = 0; x < rotuloListPrograma1.length; x++) {
            var item1 = rotuloListPrograma1[x];
            //lado verdadeiro
            var a1 = item1.split(' ');
            var a2 = a1[1].split(','); // quebra string na virgula
            var valor1 = parseInt(a2[1]); // converte para inteiro
            var einteiro1 = isNaN(valor1); //testa se é numero

            //lado falso
            var a3 = a1[2].split(','); // quebra string na virgula
            var valor2 = parseInt(a3[1]); // converte para inteiro
            var einteiro2 = isNaN(valor2); //testa se é numero

            for (var y = x; y < rotuloListPrograma2.length; y++) {
                var item2 = rotuloListPrograma2[y];

                //lado verdadeiro
                var b1 = item2.split(' ');
                var b2 = b1[1].split(','); //quebra string na virgula
                var valor3 = parseInt(b2[1]); // converte para inteiro
                var einteiro3 = isNaN(valor3); //testa se é numero

                //lado falso
                var b3 = b1[2].split(','); //quebra string na virgula
                var valor4 = parseInt(b3[1]); // converte para inteiro
                var einteiro4 = isNaN(valor4); //testa se é numero

                if (einteiro1 === einteiro3 && einteiro2 === einteiro4) {
                    lista.push('{(' + valor1 + ',' + valor3 + '),(' + valor2 + ',' + valor4 + ')}');
                } else {
                    var naosaoequivalentes = true;
                    console.log('Não são equivalentes')
                    x = rotuloListPrograma1.length;
                    alert('Rotulos não são equivalentes ' + item1 + ' | ' + item2)
                }
                y = rotuloListPrograma2.length;
            }
        }
        if (naosaoequivalentes !== true) { // se forem programas equivalentes
            lista.push('Ø');
            $scope.listaPasso4 = lista;
        }
    }
})
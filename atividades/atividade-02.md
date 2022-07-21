## CSTSI - 4SEM - LPAW - Atividades Aula 03

Exercícios de introdução a tag canvas.

1) Escreva uma função chamada **quad** com a assinatura conforme a figura abaixo:

<img src="img/atividade-02/func_quad_assign.png" width=600>

A função deverá imprimir um quadrado exato de acordo com os seguintes parâmetros:

* **ctx** -> objeto de desenho
* **x,y** -> coordenadas *x* e *y*
* **s** -> lado do quadrado
* **l** -> largura da linha
* **color** -> cor da linha
* **fill** -> se houver definirá a cor de preenchimento, do contrário não haverá preenchimento.

Implemente a função **quad** de forma que o código abaixo tenha o efeito no canvas mostrado na figura seguinte.

Código:

<img src="img/atividade-02/code01.png" width=600>

Efeito:

!["Canvas 01"](img/atividade-02/task01.png)

2) Assim como desenvolvemos uma função de mais alto nível para a criação de um quadrado, crie uma função para desenhar um círculo com a seguinte assinatura:

<img src="img/atividade-02/func_circ_assign.png" width=600>

Sendo seus parâmetros:
* **ctx** -> objeto de desenho
* **x,y** -> coordenadas *x* e *y*
* **r** -> raio do círculo
* **l** -> largura da linha de desenho
* **color** -> cor da linha
* **fill** -> se houver definirá a cor de preenchimento, do contrário não haverá preenchimento.

Implemente a função **circ** de forma que o código abaixo tenha o efeito da figura seguinte.

Código:

<img src="img/atividade-02/code02.png" width=600>

Efeito:

<img src="img/atividade-02/task02.png" width=300>

3) Utilizando as funções moveTo e lineTo, crie uma função que desenha um triângulo equilátero com a seguinte assinatura:

<img src="img/atividade-02/func_tri_assign.png" width=600>

Sendo os parâmetros:
* **ctx** -> objeto de desenho
* **x,y** -> coordenadas *x* e *y*
* **l** -> tamanho do lado do triangulo
* **color** -> cor de preenchimento
* **rev** -> se verdadeiro, o triângulo deverá ser renderizado ao contrário, reverso.

Implemente a função **triEqui** de forma que o código da figura abaixo gere a saída da figura seguinte.

Código:

<img src="img/atividade-02/code03.png" width=600>

Efeito:

<img src="img/atividade-02/task03.png" width=300>

4) Utilizando a função **triEqui**, crie uma função para desenhar uma estrela com a seguinte assinatura:

<img src="img/atividade-02/func_star_assign.png" width=400>

Implemente a função **drawStar** de forma que o código abaixo mostre o gráfico da figura seguinte.

Código:

<img src="img/atividade-02/code04.png" width=400>

Gráfico:

<img src="img/atividade-02/task04.png" width=300>

5) Reaproveitando as funções **circ** e **drawStar**, crie a função **shield** com a seguinte assinatura:

```js
function shield(ctx,x,y,size)
```

Implemente a função para que a mesma gere a figura a seguir:

Código:

<img src="img/atividade-02/code05.png" width=500>

Figura:

<img src="img/atividade-02/task05.png" width=400>
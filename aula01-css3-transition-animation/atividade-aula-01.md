## CSTSI - 4SEM - LPAW - Atividades Aula 01

1) Desenvolva uma animação para carregamento (loader) baseada no gif abaixo:

![](img/atividade-01/exercicio-01.gif)

 Não há restrição quanto a tamanho, cores ou proporções, apens a ideia geral da animação, ou seja, um círculo animado com duas cores pelo menos.


2) Crie uma nova animação baseada na anterior, porém modifique o comportamento da animação para que ela seja executada somente quando o mouse estiver na área pontilhada, como demonstra o gif abaixo:

 ![](img/atividade-01/exercicio-02.gif)

3) Use a pseudo-classe :hover e a propriedade animation para cria a animação de barra de carregamento (load bar) conforme a ilustração abaixo: 

![](img/atividade-01/exercicio-03.gif)


4) Modifique o exemplo de sprites do duende (goblin) ajustando os valores para uma imagem dez vezes maior ([big-goblin](img/goblin_big.png)), e reproduza a animação da figura abaixo:

![](img/atividade-01/exercicio-04.gif)

A animação não deverá estar em loop, até porque será preciso criar mais de uma animação e sincronizá-las.

Use esta imagem: [big-goblin](img/goblin_big.png) e esta estrutura HTML:

```html
<div class="container">
    <div class="goblin-down"></div>
    <div class="goblin-right"></div>
    <div class="goblin-up"></div>
    <div class="goblin-left"></div>
</div>
```

5) Modifique o  exemplo 12 da aula para que a animação se comporte como a imagem gif abaixo:

![](img/atividade-01/exercicio-05.gif)

6) Aplique transições nos campos do formulário de login de acordo com os efeitos mostrados na figura abaixo:

![](img/atividade-01/exercicio-06.gif)

Use a seguinte estrutura HTML:
```html
<div class="container">
        <div class="input-group">
            <label for="login">Username:</label>
            <input id="login" type="text" name="login" placeholder="Username">
        </div>
        <div class="input-group">
            <label for="password">Password:</label>
            <input id="password" type="password" name="login" placeholder="Password">
        </div>
        <div class="button-group">
            <button>Enter</button>
        </div>
    </div>
```

'use strict'

const gPanel = []

function onInit() {
    createPanel(13)
    renderPanel(gPanel)
}

function createPanel(size) {

    for (var i = 0; i < size; i++) {
        gPanel[i] = {
            dateOfBirth: 0,
            daysFromBirth: 0,
            amount: 0,
            isWinned: false,
        }
    }
}

function renderPanel(panel) {
    var strHTML = ''

    for (var i = 0; i < panel.length; i++) {
        strHTML += `
        <div class = "group-${i + 1}">
            <button class = "add-group-${i + 1}" onclick = "clickAddGroup(${i})">Add Group${i + 1} </button>\n
            <input class = "date-group-${i + 1}" type = "date"></input>\n
            <div class = "amount-group-${i + 1} amount">${gPanel[i].amount}</div>
        </div>`
    }
    const elPanel = document.querySelector('.panel')
    elPanel.innerHTML = strHTML
}

function clickAddGroup(i) {
    dateOfBirth(i)
    daysFromBirth(i)
    amountOfMilk(i)
}

function dateOfBirth(i) {
    const elInput = document.querySelector(`.date-group-${i + 1}`).value
    gPanel[i].dateOfBirth = elInput.split('-')
}

function daysFromBirth(i) {
    const nowDate = new Date();
    var strDate = gPanel[i].dateOfBirth
    const birthDate = new Date(strDate[0], strDate[1] - 1, strDate[2])

    gPanel[i].daysFromBirth = Math.floor((nowDate - birthDate) / (1000 * 60 * 60 * 24))

    return gPanel[i].daysFromBirth
}

function amountOfMilk(i) {
    if (!document.querySelector(`.date-group-${i + 1}`).value) return 0

    const daysFromBirth = gPanel[i].daysFromBirth
    var amountOfMilk = gPanel[i].amount

    if (daysFromBirth > 14) amountOfMilk = 2.5
    else if (daysFromBirth > 21) amountOfMilk = 3
    else if (daysFromBirth > 35) amountOfMilk = 2.5
    else if (daysFromBirth > 45) amountOfMilk = 2
    else if (daysFromBirth > 52) amountOfMilk = 1
    else if (daysFromBirth > 59) amountOfMilk = 0.5
    else if (daysFromBirth > 66) amountOfMilk = 0
    else amountOfMilk = 2

    gPanel[i].amount = amountOfMilk
    const elAmount = document.querySelector(`.amount-group-${i + 1}`)
    elAmount.innerHTML = amountOfMilk

    return amountOfMilk
}

function checkGroups() {
    const size = gPanel.length

    for (var i = 0; i < size; i++) {
        gPanel[i].daysFromBirth = daysFromBirth(i)
        gPanel[i].amount = amountOfMilk(i)
    }
    calcTotalAmount()
}

function calcTotalAmount() {
    const size = gPanel.length
    var totalAmount = 0

    for (var i = 0; i < size; i++) {
        totalAmount += gPanel[i].amount
    }
    const elTotal = document.querySelector('.total-amount')
    elTotal.innerText = `Total amount: ${totalAmount}`
}
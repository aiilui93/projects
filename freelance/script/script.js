document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const customer = document.getElementById('customer'),
            freelancer = document.getElementById('freelancer'),
            blockCustomer = document.querySelector('#block-customer'),
            blockFreelancer = document.querySelector('#block-freelancer'),
            blockChoice = document.querySelector('#block-choice'),
            btnExit = document.querySelector('#btn-exit'),
            formCustomer = document.getElementById('form-customer'),
            ordersTable = document.getElementById('orders'),
            modalOrder = document.getElementById('order_read'),
            modalOrderActive = document.getElementById('order_active')
            ;

    const orders = JSON.parse(localStorage.getItem('freeOrders')) || [];
    console.log(orders);
    const toStorage = () => {
        localStorage.setItem('freeOrders', JSON.stringify(orders))
    };

    const declOfNum = (number, titles) => {  
        const cases = [2, 0, 1, 1, 1, 2];  
        return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
    }
    

    const calcDeadline = (deadline) => {
        const date = new Date(deadline),
            today = new Date(),
            days = (date - today) / 86400000,
            hours = Math.floor((days % 1) * 24),
            daysText = declOfNum(Math.trunc(days), ['день', 'дня', 'дней']),
            hoursText = declOfNum(hours, ['час', 'часа', 'часов']);

        return Math.trunc(days) + ' ' + daysText  + ' ' + hours + ' ' + hoursText;
    }

    

    const renderOrders = () => {

        ordersTable.textContent = '';
        orders.forEach((order, i) => {

            ordersTable.innerHTML += `<tr class="order ${order.active ? 'taken' : ''}" 
            data-order="${i}">
                <td>${i+1}</td>
                <td>${order.title}</td>
                <td class="${order.currency}"></td>
                <td>${calcDeadline(order.deadline)}</td>
            </tr>`;

        })
    };

    const handlerModal = (event) => {
        const target = event.target;
        const modal = target.closest('.order-modal')
        const order = orders[modal.id]
        console.log(target)

        const baseAction = () => {
            modal.style.display = 'none';
            toStorage();
            renderOrders();
        }

        if (target.closest('.close') || target === modal) {
            modal.style.display = 'none'
        }

        if(target.classList.contains('get-order')){
            order.active = true;
            baseAction();
        }

        if(target.id === 'capitulation'){
            order.active = false;
            baseAction();
        }

        if(target.id === 'ready'){
            orders.splice(orders.indexOf(order),1);
            baseAction();
        }

        
    }

    const openModal = (numberOrder) => {
        
        const order = orders[numberOrder]

        const { title, firstName, email, phone, description, 
            amount, currency, deadline, active = false } = order;

        const modal = active ? modalOrderActive : modalOrder;

            console.log(title, firstName, email, phone, description, 
                amount, currency, deadline, active )

        const firstNameBlock = modal.querySelector('.firstName'),
            modalTitleBlock = modal.querySelector('.modal-title'),
            emailBlock = modal.querySelector('.email'),
            descriptionBlock = modal.querySelector('.description'),
            deadlineBlock = modal.querySelector('.deadline'),
            currencyBlock = modal.querySelector('.currency_img'),
            countBlock = modal.querySelector('.count'),
            phoneBlock = modal.querySelector('.phone');

        modal.id = numberOrder;
        modalTitleBlock.textContent = title;
        phoneBlock ?  phoneBlock.href = 'tel:' + phone : '';
        emailBlock.setAttribute('href', 'mailto:' + email);
        emailBlock.textContent = email;
        countBlock.textContent = amount;
        firstNameBlock.textContent = firstName;
        descriptionBlock.textContent = description;
        deadlineBlock.textContent = calcDeadline(deadline);
        currencyBlock.className = 'currency_img';
        currencyBlock.classList.add(currency);


        modal.style.display = 'flex';
        console.log(order)

        modal.addEventListener('click', handlerModal);
    }

    ordersTable.addEventListener('click', (event) => {
        const target = event.target;
        const targetOrder = target.closest('.order');
        if (targetOrder) {
            openModal(targetOrder.dataset.order)
        }
    })

    customer.addEventListener('click', () => {
        blockCustomer.style.display = 'block';
        blockChoice.style.display = 'none';
        btnExit.style.display = 'block';
    });

    freelancer.addEventListener('click', () => {
        blockChoice.style.display = 'none';
        renderOrders();
        blockFreelancer.style.display = 'block';
        btnExit.style.display = 'block';
    });

    btnExit.addEventListener('click', () => {
        btnExit.style.display = 'none';
        blockFreelancer.style.display = 'none';
        blockCustomer.style.display = 'none';
        blockChoice.style.display = 'block';
    })


    formCustomer.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const obj = {};

        /*for (const elem of formCustomer.elements){
            if((elem.tagName === 'INPUT' && elem.type !== 'radio') ||
            (elem.type === 'radio' && elem.checked) || 
            (elem.tagName === 'TEXTAREA')){
                obj[elem.name] = elem.value;

                if(elem.type !== 'radio') {
                    elem.value = '';
                }
            }
        }*/

        //TODO: переписать через forEach
        /*[...formCustomer.elements].forEach((elem) => {
            if((elem.tagName === 'INPUT' && elem.type !== 'radio') ||
            (elem.type === 'radio' && elem.checked) || 
            (elem.tagName === 'TEXTAREA')){
                obj[elem.name] = elem.value;

                if(elem.type !== 'radio') {
                    elem.value = '';
                }
            }
        });*/

        const filteredItems = [...formCustomer.elements]
            .filter((elem) => (elem.tagName === 'INPUT' && elem.type !== 'radio') ||
                (elem.type === 'radio' && elem.checked) || 
                elem.tagName === 'TEXTAREA');
            
        filteredItems.forEach((elem) => {
            obj[elem.name] = elem.value;
        })

        orders.push(obj);
        toStorage();
        formCustomer.reset();
    })

    //TODO: вывести, сколько дней до конца дедлайна вместо даты, 
    //просклонять дни дней, часы часов
    //вынести в отдельную функцию



})
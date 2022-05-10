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
            modalOrderActive = document.getElementById('order_active'),
            modalClose = document.querySelector('.close')
            ;

    const orders = [];

    const renderOrders = () => {

        ordersTable.textContent = '';

        orders.forEach((order, i) => {

            ordersTable.innerHTML += `<tr class="order" data-order="${i}">
                <td>${i+1}</td>
                <td>${order.title}</td>
                <td class="${order.currency}"></td>
                <td>${order.deadline}</td>
            </tr>`;

        })

    }

    const openModal = (numberOrder) => {
        
        const order = orders[numberOrder]
        const modal = order.active ? modalOrderActive : modalOrder;

        const firstNameBlock = document.querySelector('.firstName'),
            modalTitleBlock = document.querySelector('.modal-title'),
            emailBlock = document.querySelector('.email'),
            descriptionBlock = document.querySelector('.description'),
            deadlineBlock = document.querySelector('.deadline'),
            currencyBlock = document.querySelector('.currency_img'),
            countBlock = document.querySelector('.count'),
            phoneBlock = document.querySelector('.phone');

            modalTitleBlock.textContent = order.title;
            phoneBlock.setAttribute('href', 'tel:' + order.phone);
            emailBlock.setAttribute('href', 'mailto:' + order.email);
            emailBlock.textContent = order.email;
            countBlock.textContent = order.amount;
            firstNameBlock.textContent = order.firstName;
            descriptionBlock.textContent = order.description;
            deadlineBlock.textContent = order.deadline;
            currencyBlock.classList.add(order.currency);
            

            modal.style.display = 'block';
            console.log(order)
    }

    const closeModal = (modal) => {
        modal.style.display = 'none';
    }


    modalClose.addEventListener('click', (event) => {
        const modal = event.target.closest('.modal');
        closeModal(modal);
    })

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

        //TODO: переписать через filter
        const filteredItems = [...formCustomer.elements]
            .filter((elem) => (elem.tagName === 'INPUT' && elem.type !== 'radio') ||
                (elem.type === 'radio' && elem.checked) || 
                elem.tagName === 'TEXTAREA');
            
        filteredItems.forEach((elem) => {
            obj[elem.name] = elem.value;
        })

        //TODO: ресет для формы после сохранения
        
        orders.push(obj);
        formCustomer.reset();
    })


})
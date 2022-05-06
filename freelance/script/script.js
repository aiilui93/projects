document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const customer = document.getElementById('customer'),
            freelancer = document.getElementById('freelancer'),
            blockCustomer = document.querySelector('#block-customer'),
            blockFreelancer = document.querySelector('#block-freelancer'),
            blockChoice = document.querySelector('#block-choice'),
            btnExit = document.querySelector('#btn-exit'),
            formCustomer= document.getElementById('form-customer');

    const orders = [];

    customer.addEventListener('click', () => {
        blockCustomer.style.display = 'block';
        blockChoice.style.display = 'none';
        btnExit.style.display = 'block';
    });

    freelancer.addEventListener('click', () => {
        blockChoice.style.display = 'none';
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
        const filteredItems = Array.from(formCustomer.elements)
            .filter((elem) => (elem.tagName === 'INPUT' && elem.type !== 'radio') ||
                (elem.type === 'radio' && elem.checked) || 
                elem.tagName === 'TEXTAREA');
            
        filteredItems.forEach((elem) => {
            obj[elem.name] = elem.value;

            if (elem.type !== 'radio') {
                elem.value = '';
            }

        })

        //TODO: ресет для формы после сохранения
        
        orders.push(obj);
        console.log(orders);
    })
})
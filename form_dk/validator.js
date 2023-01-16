//doi tuong validator
function Validator(options) {
    //truong hợp bao quanh thẻ input có nhiều thẻ cha, lặp lấy thẻ cha là .form-group
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            } 
            element = element.parentElement;
        }
    }

    var selectorRules ={};
    //ham thuc hien Validate
    function validate(inputElement, rule) {
        var errorMessage;
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        
        //lay ra cac rule cua selector
        var rules = selectorRules[rule.selector];
        //lap qua tung rule va kiem tra, neu loi thi dung ktra
        for(var i=0;i<rules.length;++i) {
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    );
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
            }
            if (errorMessage) break;
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add('invalid');
        }
        else {
            errorElement.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
        }   
        return !errorMessage;            
    }
    //lay element cua form
    var formElement = document.querySelector(options.form);

    //console.log(options.rules);

    if (formElement) {
        formElement.onsubmit = function (e) {
            e.preventDefault();

            var isFormValid = true;
            
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if(!isValid) {
                    isFormValid = false;
                }
            
            });

            
            if (isFormValid) {
                //console.log('k co loi');
                if (typeof options.onSubmit === 'function') {

                    var enableInputs = formElement.querySelectorAll('[name]:not([disabled])');
                    var formValues = Array.from(enableInputs).reduce(function (values, input) {
                        values[input.name] = input.value;
                        return values;
                    }, {});

                    options.onSubmit(formValues);
                }
                else {
                    formElement.submit();
                }
            }
            else {
                console.log('co loi')
            }
        }


        //lap qua moi rule va xu ly: lang nghe su kien
        options.rules.forEach(function (rule) {

            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            }
            else {
                selectorRules[rule.selector] = [rule.test];
            }
        
            var inputElement = formElement.querySelector(rule.selector);
        
            //console.log(getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector));
            if (inputElement) {
                //xu ly truong hop blur khoi input
                inputElement.onblur = function () {
                    // console.log(rule);
                    // console.log(inputElement.value);
                    validate(inputElement, rule);

                //xu ly truong hop nguoi dung nhap vao input
                inputElement.oninput = function() {
                    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                    errorElement.innerText='';
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                }


                }
            }
        });
    }
}
//dinh nghia cac rule
// nguyen tac cac rule
    //khi cos loi => tra message loi
    //khi hop le => khong tra ra cai gi (undefined)
Validator.isRequired = function(selector) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined: 'Vui long nhap truong nay'
        }
    };
}

Validator.isEmail = function(selector) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined: 'email k hop le!';
        }
    };
}

Validator.minLength = function(selector, min) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined: `Vui long nhap toi thieu ${min} ki tu`;
        }
    };
}

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value == getConfirmValue() ? undefined : message || 'khong trung khop';
        }
    }
}


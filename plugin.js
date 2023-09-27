/*
  * Title : Visametric autofill
  * Author: Naderidev
  * Github: https://github.com/naderidev
*/

if (window.location.href === 'https://ir-appointment.visametric.com/ir/appointment-form') {
    $(document).ready(function () {
        clearInterval(x)

        // Config -->
        if (typeof VA_CONFIG === 'undefined') {
            console.log('ERROR: VA_CONFIG not found! please define your own config.')
            return null
        } else {
            // Start -->
            let totalRequests = 0
            const limitRequests = 20

            function prevent429(requests = 1) {
                totalRequests += requests
                if (totalRequests > limitRequests) {
                    window.location.reload()
                }
            }

            function wait(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }

            function selectCityStep(reload = false) {
                const cityElement = $("#city")
                if (cityElement.find('option[value="' + VA_CONFIG['city'] + '"]') !== undefined) {
                    prevent429()
                    cityElement.val(VA_CONFIG['city'])
                    cityElement.trigger('change')
                    console.log('STEP 1 --> City ' + (reload ? 'reloaded' : 'selected'))
                    selectOfficeStep()
                } else {
                    if (!reload) {
                        window.location.reload()
                    }
                }
            }

            function selectOfficeStep() {
                const officeElement = $("#office")
                if (officeElement.find('option[value="' + VA_CONFIG['office'] + '"]') !== undefined) {
                    prevent429()
                    officeElement.val(VA_CONFIG['office'])
                    officeElement.trigger('change')
                    console.log('STEP 2 --> Office selected')
                    selectOfficeType()

                } else {
                    console.log('STEP 5 --> Failed in loading offices! retrying...')
                    wait(3000).then(r => {
                        selectCityStep(true)
                    })

                }
            }

            function selectOfficeType() {
                const officeTypeElement = $("#officetype")
                officeTypeElement.val(VA_CONFIG['officeType'])
                officeTypeElement.trigger('change')
                console.log('STEP 3 --> Office type selected')
                selectTotalPerson()
            }

            function selectTotalPerson() {
                const totalPersonElement = $("#totalPerson")
                prevent429(2)
                totalPersonElement.val(VA_CONFIG['persons'].length)
                totalPersonElement.trigger('change')
                if ($('.setnewcalendarstatus').val() !== '' && $('#totalFEE').text() !== '') {
                    console.log('STEP 4 --> Total person selected')
                    selectAndFillPaymentInfo()
                } else {
                    console.log('STEP 5 --> Total person selection failed! retrying...')
                    wait(4000).then(r => {
                        selectTotalPerson()
                    })
                }
            }

            function selectAndFillPaymentInfo() {
                const cardNumberElement = $('#paymentCardInput')
                const cardDateElement = $('#popupDatepicker2')
                const payTypeCardElement = $('#atm')
                const checkBtn = $('#checkCardListBtn')
                const paymentCheckList = $("#checkCardListDiv")
                const next = $('#btnAppCountNext')
                payTypeCardElement.trigger('click')
                cardNumberElement.val(VA_CONFIG['card']['number'])
                cardDateElement.val(VA_CONFIG['card']['date'])
                checkBtn.trigger('click')
                prevent429()
                const payment = paymentCheckList.find("input[class='bankpaymentRadio']")
                if (payment !== undefined) {
                    payment[0].click()
                    next.trigger('click')
                    prevent429()
                    console.log('STEP 5 --> Payment selected & first section finished')
                    fillPersonalData()
                } else {
                    console.log('STEP 5 --> Failed in loading payment! retrying...')
                    wait(3000).then(r => {
                        selectAndFillPaymentInfo()
                    })
                }
            }

            function fillPersonalData() {
                const shebaNumberElement = $('#scheba_number')
                const shebaHolderNameElement = $('#scheba_name')
                const next1 = $('#btnAppPersonalNext')
                const previewCheckCheckBox = $('#previewchk')
                const next2 = $('#btnAppPreviewNext')
                shebaNumberElement.val(VA_CONFIG['sheba']['number'])
                shebaHolderNameElement.val(VA_CONFIG['sheba']['holderName'])
                VA_CONFIG['persons'].forEach(function (person, i) {
                    const index = i + 1
                    $('#name' + index).val(person['name'])
                    $('#surname' + index).val(person['surname'])
                    $('#birthyear' + index).val(person['birthDate'][0])
                    $('#birthmonth' + index).val(person['birthDate'][1])
                    $('#birthday' + index).val(person['birthDate'][2])
                    $('#passport' + index).val(person['passport'])
                    $('#phone' + index).val(person['phone'])
                    $('#email' + index).val(person['email'])
                })
                next1.trigger('click')
                previewCheckCheckBox.trigger('click')
                next2.trigger('click')
                prevent429(2)
                console.log('STEP 6 --> Personal detail form filled & second section finished')

                $('body').append(
                    '<button id="reload-datepicker" class="btn btn-dark p-3 fs-5" style="position: fixed; bottom: 20px; left: 20px">RELOAD DATE</button>'
                )

                $("#reload-datepicker").on('click', function () {
                    next2.trigger('click')
                    prevent429(2)
                    console.log('Notice: Date reloaded!')
                    alert('Datepicker reloaded!')
                })
            }

            selectCityStep()
        }
    })
}
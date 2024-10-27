let soilMoisture = 0
let analogValue = 0
let setSoilMoisture = 20
let setMotorSpeed = 50
basic.forever(function () {
    analogValue = 0
    for (let index = 0; index <= 9; index++) {
        analogValue += pins.analogReadPin(AnalogPin.P0)
    }
    analogValue = analogValue / 10
    soilMoisture = Math.round(pins.map(
    analogValue,
    0,
    1023,
    100,
    0
    ))
})
basic.forever(function () {
    lcd.displayText("Moisture:" + soilMoisture + "%    ", 1, 1)
    lcd.displayText("SM:" + setSoilMoisture + "  ", 1, 2)
    lcd.displayText("SP:" + setMotorSpeed + "  ", 9, 2)
    if (soilMoisture > setSoilMoisture) {
        basic.showIcon(IconNames.Happy)
    } else {
        basic.showIcon(IconNames.Sad)
    }
    basic.pause(200)
})
basic.forever(function () {
    if (input.buttonIsPressed(Button.B)) {
        basic.pause(200)
        setMotorSpeed += 5
        if (setMotorSpeed > 100) {
            setMotorSpeed = 5
        }
    } else if (input.buttonIsPressed(Button.A)) {
        basic.pause(200)
        setSoilMoisture += 1
        if (setSoilMoisture > 100) {
            setSoilMoisture = 0
        }
    }
})
basic.forever(function () {
    if (soilMoisture > setSoilMoisture) {
        l9110.pauseMotor(l9110.Motor.MotorA)
    } else {
        l9110.controlMotor(l9110.Motor.MotorA, l9110.Rotate.Forward, setMotorSpeed)
    }
})

let soilMoisture = 0
let setSoilMoisture = 20
let setMotorSpeed = 50
basic.forever(function () {
    soilMoisture = Math.round(pins.map(
    pins.analogReadPin(AnalogPin.P0),
    0,
    1023,
    100,
    0
    ))
})
basic.forever(function () {
    serial.writeLine("Soil Moisture: " + soilMoisture + " %")
    serial.writeLine("Set Soil Moisture: " + setSoilMoisture + " %")
    serial.writeLine("Set Motor Speed: " + setMotorSpeed + " %")
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

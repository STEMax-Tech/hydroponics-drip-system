let setSoilMoisture = 0
let soilMoisture = 0
let analogValue = EEPROM.readw(0)
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
    serial.writeLine("Soil Moisture: " + soilMoisture + " %")
    serial.writeLine("Set Soil Moisture: " + setSoilMoisture)
    lcd.displayText("Moisture:" + soilMoisture + "%    ", 1, 1)
    lcd.displayText("Set Moisture:" + setSoilMoisture + "    ", 1, 2)
    if (soilMoisture > setSoilMoisture) {
        lcd.displayText(" ", 16, 1)
        basic.showIcon(IconNames.Happy)
    } else {
        lcd.displayText(lcd.displaySymbol(lcd.Symbols.sym10), 16, 1)
        basic.showIcon(IconNames.Sad)
        music.play(music.tonePlayable(880, music.beat(BeatFraction.Eighth)), music.PlaybackMode.UntilDone)
    }
    basic.pause(200)
})
basic.forever(function () {
    if (input.buttonIsPressed(Button.A)) {
        setSoilMoisture += -1
        if (setSoilMoisture < 0) {
            setSoilMoisture = 100
        }
        basic.showLeds(`
            . . . . .
            . . . . .
            . # # # .
            . . . . .
            . . . . .
            `)
    } else if (input.buttonIsPressed(Button.B)) {
        setSoilMoisture += 1
        if (setSoilMoisture > 100) {
            setSoilMoisture = 0
        }
        basic.showLeds(`
            . . . . .
            . . # . .
            . # # # .
            . . # . .
            . . . . .
            `)
    }
    if (input.logoIsPressed()) {
        while (input.logoIsPressed()) {
            basic.showIcon(IconNames.Yes)
        }
        EEPROM.writew(0, setSoilMoisture)
        music.play(music.tonePlayable(880, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
    }
})
basic.forever(function () {
    if (soilMoisture > setSoilMoisture) {
        l9110.pauseMotor(l9110.Motor.MotorA)
        l9110.pauseMotor(l9110.Motor.MotorB)
    } else {
        l9110.controlMotor(l9110.Motor.MotorA, l9110.Rotate.Forward, 100)
        l9110.controlMotor(l9110.Motor.MotorB, l9110.Rotate.Forward, 100)
    }
})

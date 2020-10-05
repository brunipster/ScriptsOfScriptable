var isDarkMode = Device.isUsingDarkAppearance()

var color = args.widgetParameter

var theme = isDarkMode ? 
{background1: "141414",
background2: "13233F",
primary: "FFFF",
secondary: "0000",
cases
}:
{}

let totalData = await requestTotalData.loadJSON()

let totalCases = totalData["Total Cases_text"].toLocaleString()

var widget = new ListWidget()


 let gradient = new LinearGradient()
  gradient.locations = [0, 1]
  gradient.colors = [
    new Color("141414"),
    new Color("13233F")
  ]
  widget.backgroundGradient = gradient

let stack = widget.addStack()

let caseStack = stack.addStack()
caseStack.size = new Size(100, 100)
caseStack.backgroundColor = Color.blue()
caseStack.addSpacer(10)

let deathStack = stack.addStack()
deathStack.size = new Size(100, 100)
deathStack.backgroundColor = Color.red()
deathStack.addSpacer(10)

let recoveredStack = stack.addStack()
recoveredStack.size = new Size(100, 100)
recoveredStack.backgroundColor = Color.blue()
recoveredStack.spacing = 100

stack.spacing = 10
stack.layoutHorizontally()

// let head = stack.addText(totalCases)
// let font = new Font("Arial", 30)
// head.font = font
// head.textColor = new Color("#fff")
// totalCaseStack.addSpacer(30)
// let cases = stack.addText('Total de Casos de Covid en el Peru') 
// let font2 = new Font("Courier-Oblique", 15) 
// cases.font = font2 
// cases.textColor = new Color('#fff')
stack.cornerRadius = 24 
stack.setPadding(20, 20, 20, 20)


stack.size = new Size(360, 170)

Script.setWidget(widget)

if (config.runsInWidget) {
  Script.setWidget(widget)
} else {
  widget.presentMedium()
}
let requestTotalData = new Request('https://covid-19.dataflowkit.com/v1/peru') 

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
caseStack.size = new Size(320, 65)
caseStack.backgroundColor = Color.blue()
caseStack.cornerRadius = 25
caseStack.setPadding(0, 10, 0, 10)
caseStack.centerAlignContent()

let bottomStack = stack.addStack()
bottomStack.size = new Size(320, 65)
bottomStack.setPadding(0, 10, 0, 10)
bottomStack.centerAlignContent()

let deathStack = bottomStack.addStack()
deathStack.size = new Size(150, 65)
deathStack.backgroundColor = Color.red()
deathStack.cornerRadius = 25

let recoveredStack = bottomStack.addStack()
recoveredStack.size = new Size(150, 65)
recoveredStack.backgroundColor = Color.yellow()
recoveredStack.cornerRadius = 25

bottomStack.spacing = 10
bottomStack.layoutHorizontally()

stack.layoutVertically()

// let head = stack.addText(totalCases)
// let font = new Font("Arial", 30)
// head.font = font
// head.textColor = new Color("#fff")
// totalCaseStack.addSpacer(30)
// let cases = stack.addText('Total de Casos de Covid en el Peru') 
// let font2 = new Font("Courier-Oblique", 15) 
// cases.font = font2 
// cases.textColor = new Color('#fff')
stack.centerAlignContent()
stack.cornerRadius = 10
stack.spacing = 10
stack.setPadding(20, 20, 20, 20)
stack.size = new Size(360, 170)

Script.setWidget(widget)

if (config.runsInWidget) {
  Script.setWidget(widget)
} else {
  widget.presentMedium()
}
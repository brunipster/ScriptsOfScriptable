let requestTotalData = new Request('https://covid-19.dataflowkit.com/v1/peru') 

var isDarkMode = Device.isUsingDarkAppearance()

var color = args.widgetParameter

var theme = isDarkMode ? 
{background1: "1C1C1E",
background2: "45454A",
primary: "FFFFFF",
secondary: "0000",
casesBackground: "3C91E6",
deathBackground: "BB4430",
recoveredBackground: "7BB22E"
}:
{
  background1: "FFFFFF",
  background2: "D6D6D6",
  primary: "FFFFFF",
  secondary: "0000",
  casesBackground: "3C91E6",
  deathBackground: "BB4430",
  recoveredBackground: "7BB22E"
}

var size = {
  width: 360,
  height: 170,
  padding: 20,
  spacing:10,
  cornerRadius: 25
}

let totalData = await requestTotalData.loadJSON()

let totalCases = totalData["Total Cases_text"].toLocaleString()
let totalActiveCases = totalData["Active Cases_text"].toLocaleString()
let totalDeaths = totalData["Total Deaths_text"].toLocaleString()
let totalRecovered = totalData["Total Recovered_text"].toLocaleString()
let newCases = totalData["New Cases_text"].toLocaleString()
let newDeaths = totalData["New Cases_text"].toLocaleString()

var widget = new ListWidget()

let gradient = new LinearGradient()
gradient.locations = [0, 1]
gradient.colors = [
  new Color(theme.background1),
  new Color(theme.background2)
]
widget.backgroundGradient = gradient

let stack = widget.addStack()
stack.cornerRadius = size.cornerRadius
stack.spacing = size.spacing
stack.layoutVertically()
stack.centerAlignContent()
stack.setPadding(size.padding.repeat(4))
stack.size = new Size(size.width, size.height)

  let topStack = stack.addStack()
  topStack.size = new Size(size.width - (size.padding * 2), (size.height / 2) - size.spacing)
  topStack.centerAlignContent()
    
    let caseStack = topStack.addStack()
    caseStack.size = new Size(size.width - (size.padding * 2), (size.height / 2) - size.spacing)
    caseStack.backgroundColor = Color(theme.casesBackground)

  let bottomStack = stack.addStack()
  bottomStack.size = new Size(size.width - (size.padding * 2), (size.height / 2) - size.spacing)
  bottomStack.centerAlignContent()
  bottomStack.spacing = size.spacing
  bottomStack.layoutHorizontally()

    let deathStack = bottomStack.addStack()
    deathStack.size = new Size((size.width - (size.padding * 2))/2, (size.height / 2) - size.spacing)
    deathStack.backgroundColor = Color(theme.deathBackground)
    deathStack.cornerRadius = size.cornerRadius

    let recoveredStack = bottomStack.addStack()
    recoveredStack.size = new Size((size.width - (size.padding * 2))/2, (size.height / 2) - size.spacing)
    recoveredStack.backgroundColor = Color(theme.recoveredBackground)
    recoveredStack.cornerRadius = size.cornerRadius

// let head = stack.addText(totalCases)
// let font = new Font("Arial", 30)
// head.font = font
// head.textColor = new Color("#fff")
// totaltopStack.addSpacer(30)
// let cases = stack.addText('Total de Casos de Covid en el Peru') 
// let font2 = new Font("Courier-Oblique", 15) 
// cases.font = font2 
// cases.textColor = new Color('#fff')

Script.setWidget(widget)

if (config.runsInWidget) {
  Script.setWidget(widget)
} else {
  widget.presentMedium()
}
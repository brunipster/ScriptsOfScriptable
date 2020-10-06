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

var sizeStack = {
  width: 360,
  height: 170,
  spacing: 8,
  padding: 4,
  cornerRadius: 25
}

var sizeCases = {
  width: ((sizeStack.width / 2) - sizeStack.spacing) - (sizeStack.padding / 2),
  height: sizeStack.height - (sizeStack.padding*2) - sizeStack.spacing,
}
console.log(sizeCases.height)
var sizeBoxes = {
  width: sizeCases.width,
  height: (sizeCases.height / 2) - (sizeStack.spacing / 2),
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
stack.cornerRadius = sizeStack.cornerRadius
stack.spacing = sizeStack.spacing
stack.layoutHorizontally()
stack.centerAlignContent()
stack.setPadding(sizeStack.padding,sizeStack.padding,sizeStack.padding,sizeStack.padding)
stack.size = new Size(sizeStack.width, sizeStack.height)

  let leftStack = stack.addStack()
  leftStack.size = new Size(sizeCases.width, sizeCases.height)
  leftStack.spacing = sizeStack.spacing
  leftStack.centerAlignContent()
  leftStack.cornerRadius = sizeStack.cornerRadius
  leftStack.backgroundColor = new Color(theme.casesBackground)
  
      let numberTotalCases = leftStack.addText(totalCases)
      let fontTotalCasesNumber = new Font("Arial", 24)
      numberTotalCases.font = fontTotalCasesNumber
      numberTotalCases.textColor = new Color("#fff")
      numberTotalCases.addSpacer(12)

      let textTotalCases = leftStack.addText("Total de Infectados")
      let fontTotalCasesText = new Font("Arial", 16)
      textTotalCases.font = fontTotalCasesText
      textTotalCases.textColor = new Color("#fff")
      textTotalCases.addSpacer(12)

  let rightStack = stack.addStack()
  rightStack.size = new Size(sizeCases.width, sizeCases.height)
  rightStack.centerAlignContent()
  rightStack.spacing = sizeStack.spacing
  rightStack.layoutVertically()

    let deathStack = rightStack.addStack()
    deathStack.size = new Size(sizeBoxes.width, sizeBoxes.height)
    deathStack.backgroundColor = new Color(theme.deathBackground)
    deathStack.cornerRadius = sizeStack.cornerRadius

    let recoveredStack = rightStack.addStack()
    recoveredStack.size = new Size(sizeBoxes.width, sizeBoxes.height)
    recoveredStack.backgroundColor = new Color(theme.recoveredBackground)
    recoveredStack.cornerRadius = sizeStack.cornerRadius

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
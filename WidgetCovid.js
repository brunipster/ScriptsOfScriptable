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
  padding: 10,
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
  leftStack.layoutVertically()
  leftStack.setPadding(sizeStack.padding,sizeStack.padding,sizeStack.padding,sizeStack.padding)
  
      let numberTotalCases = leftStack.addText(totalCases)
      let fontTotalCasesNumber = new Font("Arial", 26)
      numberTotalCases.font = fontTotalCasesNumber
      numberTotalCases.textColor = new Color("#fff")
//       numberTotalCases.addSpacer(12)

      let textTotalCases = leftStack.addText("Total de Infectados")
      let fontTotalCasesText = new Font("Arial", 20)
      textTotalCases.font = fontTotalCasesText
      textTotalCases.textColor = new Color("#fff")
//       textTotalCases.addSpacer(12)

  let rightStack = stack.addStack()
  rightStack.size = new Size(sizeCases.width, sizeCases.height)
  rightStack.centerAlignContent()
  rightStack.spacing = sizeStack.spacing
  rightStack.layoutVertically()

    let deathStack = rightStack.addStack()
    deathStack.size = new Size(sizeBoxes.width, sizeBoxes.height)
    deathStack.backgroundColor = new Color(theme.deathBackground)
    deathStack.cornerRadius = sizeStack.cornerRadius

      let numberTotalDeahts = deathStack.addText(totalDeaths)
      let fontTotalDeahtsNumber = new Font("Arial", 20)
      numberTotalDeahts.font = fontTotalDeahtsNumber
      numberTotalDeahts.textColor = new Color("#fff")

      let textTotalDeahts = deathStack.addText("Total de Fallecidos")
      let fontTotalDeahtsText = new Font("Arial", 16)
      textTotalDeahts.font = fontTotalDeahtsText
      textTotalDeahts.textColor = new Color("#fff")

    let recoveredStack = rightStack.addStack()
    recoveredStack.size = new Size(sizeBoxes.width, sizeBoxes.height)
    recoveredStack.backgroundColor = new Color(theme.recoveredBackground)
    recoveredStack.cornerRadius = sizeStack.cornerRadius

      let numberTotalRecovered = deathStack.addText(totalRecovered)
      let fontTotalRecoveredNumber = new Font("Arial", 20)
      numberTotalRecovered.font = fontTotalRecoveredNumber
      numberTotalRecovered.textColor = new Color("#fff")
      
      let textTotalRecovered = deathStack.addText("Total de Recuperados")
      let fontTotalRecoveredText = new Font("Arial", 16)
      textTotalRecovered.font = fontTotalRecoveredText
      textTotalRecovered.textColor = new Color("#fff")

Script.setWidget(widget)

if (config.runsInWidget) {
  Script.setWidget(widget)
} else {
  widget.presentMedium()
}
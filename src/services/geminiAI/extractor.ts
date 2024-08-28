export function extractMeasureValue(extractedText: string): number {
  // Use uma expressão regular para encontrar números com casas decimais
  const match = extractedText.match(/(\d+(\.\d+)?)/);
  
  if (match) {
    const numberString = match[0];
    const numberValue = parseFloat(numberString);
    
    // Adiciona casas decimais se necessário
    return Number.isInteger(numberValue) ? parseFloat(numberString + '.0') : numberValue;
  }

  return 0;
}

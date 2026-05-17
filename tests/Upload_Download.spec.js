const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');

async function WriteExcelTest(searchText, replaceText, change, filePath) {


    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet, searchText);
    const cell = worksheet.getCell(output.row, output.column + change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);

}

async function readExcel(worksheet, searchText) {
    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            // console.log(cell.value);

            if (cell.value === searchText) {
                console.log("row no :" + rowNumber);
                console.log("col no :" + colNumber);
                output.row = rowNumber;
                output.column = colNumber;
            }

        })


    })
    return output;
}


//WriteExcelTest("Banana",350,{rowChange:0,colChange:2},"C:/Users/hp/OneDrive/Desktop/playwright projects/ExcelJsUtils/documents/excelTest.xlsx");

test('Upload download excel validation', async ({ page }) => {

    const textSearch = 'Mango';
    const updateValue = '350';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');

    await page.getByRole("button", { name: 'Download' }).click();

    const download = await downloadPromise;
    const filePath = "C:/Users/hp/Downloads/excelTest.xlsx";
    await download.saveAs(filePath);

    console.log("Download completed and saved to:", filePath);

    WriteExcelTest(textSearch, updateValue, { rowChange: 0, colChange: 2 }, filePath);
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles(filePath);
    const desiredRow = await page.getByRole('row').filter({ has: page.getByText(textSearch) });
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);


})



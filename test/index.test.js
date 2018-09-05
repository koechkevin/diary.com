describe("message on landing page",() => {
    Mock = jest.spyOn(global, 'fetch');
    Mock.mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve({"status": "success", "Message": "welcome to my diary. This is it!"})
    }))
    document.body.innerHTML = `
        <div class="topnav">
        <img class="view" id = "logo" src="/static/myDiary.png" alt="logo" />
        </div>
        <div class = "welcome">
        <h1>
            <font color="white">
            <div id="output">welcome to my diary. This is it!</div>
            </font>
        </h1>
        </div>
        `;
    spyMock = jest.spyOn(window.location,"assign");
    spyMock.mockImplementation();    
    require("../static/index.js")
    it("Ensures index page is loaded", async()=>{
        window.document.dispatchEvent(new Event("DOMContentLoaded", {}));
    })
    expect(document.getElementById('output').innerHTML).toBe("welcome to my diary. This is it!");
})

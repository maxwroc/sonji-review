const defaultData = {
    arrayOfObjects: [
        {
            id: 1,
            name: "object 1"
        },
        {
            id: 2,
            name: "object 2"
        }
    ],
    arrayOfNumbers: [1,2,3,4,5],
    arrayOfStrings: ["lorem", "ipsum", "dolor", "sit", "amet"],
    lotOfElements: ["Lorem", "ipsum", "dolor", "sit", "amet,", "consectetur", "adipiscing", "elit,", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua.", "Ut", "enim", "ad", "minim", "veniam,", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea", "commodo", "consequat.", "Duis", "aute", "irure", "dolor", "in", "reprehenderit", "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla", "pariatur.", "Excepteur", "sint", "occaecat", "cupidatat", "non", "proident,", "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"],
    lotOfProperties: {"Lorem":{"test":1,"number":2},"ipsum":{"test":1,"number":2},"dolor":{"test":1,"number":2},"sit":{"test":1,"number":2},"amet":{"test":1,"number":2},"consectetur":{"test":1,"number":2},"adipiscing":{"test":1,"number":2},"elit,":{"test":1,"number":2},"sed":{"test":1,"number":2},"do":{"test":1,"number":2},"eiusmod":{"test":1,"number":2},"tempor":{"test":1,"number":2},"incididunt":{"test":1,"number":2},"ut":{"test":1,"number":2},"labore":{"test":1,"number":2},"et":{"test":1,"number":2},"dolore":{"test":1,"number":2},"magna":{"test":1,"number":2},"aliqua.":{"test":1,"number":2},"Ut":{"test":1,"number":2},"enim":{"test":1,"number":2},"ad":{"test":1,"number":2},"minim":{"test":1,"number":2},"veniam,":{"test":1,"number":2},"quis":{"test":1,"number":2},"nostrud":{"test":1,"number":2},"exercitation":{"test":1,"number":2},"ullamco":{"test":1,"number":2},"laboris":{"test":1,"number":2},"nisi":{"test":1,"number":2},"aliquip":{"test":1,"number":2},"ex":{"test":1,"number":2},"ea":{"test":1,"number":2},"commodo":{"test":1,"number":2},"consequat.":{"test":1,"number":2},"Duis":{"test":1,"number":2},"aute":{"test":1,"number":2},"irure":{"test":1,"number":2},"in":{"test":1,"number":2},"reprehenderit":{"test":1,"number":2},"voluptate":{"test":1,"number":2},"velit":{"test":1,"number":2},"esse":{"test":1,"number":2},"cillum":{"test":1,"number":2},"eu":{"test":1,"number":2},"fugiat":{"test":1,"number":2},"nulla":{"test":1,"number":2},"pariatur.":{"test":1,"number":2},"Excepteur":{"test":1,"number":2},"sint":{"test":1,"number":2},"occaecat":{"test":1,"number":2},"cupidatat":{"test":1,"number":2},"non":{"test":1,"number":2},"proident,":{"test":1,"number":2},"sunt":{"test":1,"number":2},"culpa":{"test":1,"number":2},"qui":{"test":1,"number":2},"officia":{"test":1,"number":2},"deserunt":{"test":1,"number":2},"mollit":{"test":1,"number":2},"anim":{"test":1,"number":2},"id":{"test":1,"number":2},"est":{"test":1,"number":2},"laborum":{"test":1,"number":2}},
    objects: [
        { fname: "John", sname: "Morrison", email: "johny@contoso.com", jobTitle: "Product Manager", manager: "Wendy Jones" },
        { fname: "Wendy", sname: "Jones", email: "wendy@contoso.com", jobTitle: "CEO", manager: null },
        { fname: "Lisa", email: "lisa@contoso.com", jobTitle: "Business Admin", manager: "Wendy Jones" },
    ],
    longStrings: {
        "veryLongPropertyNameWhichShouldBeTruncatedAtSomePointAsOtherwiseItIsHardToReadJsonOutput": "thisIsValueWhichIsEvenLongerThanPropertyNameAndAsWellItShouldBeTruncatedAtSomePointItIsVeryCommonThatValuesCanBeVeryLongAndThisCanBreakTheView",
        "valueContaining\nNewLines": "every\nline\nis\nimportant"
    }
};

const getPlugins = (data) => {
    const plugins = [];
    $("*[data-plugin]").forEach(p => {
        p = $(p);

        if (!p.is(":checked")) {
            return;
        }

        switch(p.attr("data-plugin")) {

            case "auto-expand":
                plugins.push(SonjReview.plugins.autoExpand(2));
                break;

            case "search" :
                const searchPlugin = SonjReview.plugins.search(data);

                const searchInput = document.getElementById("search-box");
                searchInput.addEventListener("keyup", evt => {
                    if (evt.keyCode == 13) {
                        searchPlugin.query(searchInput.value);
                    }
                });

                plugins.push(searchPlugin);
                break;

            case "groups":
                plugins.push(SonjReview.plugins.propertyGroups(10));
                break;

            case "teaser":
                plugins.push(SonjReview.plugins.propertyTeaser({ properties: { names: ["fname", "sname", "email"], maxCount: 2 } }));
                break;

            case "truncate":
                plugins.push(SonjReview.plugins.truncate({ showLength: true, enableShowFull: true }));
                break;
            
            case "actions-menu":
                plugins.push(SonjReview.plugins.propertyMenu());
                break;
        }
    });

    return plugins;
}

const renderJson = () => {
    $("#json-content").empty();

    let data = defaultData;

    let customData = $("#custom-json").val();
    if (customData) {
        try {
            customData = JSON.parse(customData);

            data = customData;
        }
        catch (e) {
            console.error("Failed to parse custom JSON data.", e);
            return;
        }
    }

    let jsonViewer = new SonjReview.JsonViewer(data, "root", getPlugins(data));
    jsonViewer.render("json-content");
}

$(() => {
    renderJson();

    $("#custom-json").on("input", () => renderJson());
    $("*[data-plugin]").on("change", () => renderJson());
});
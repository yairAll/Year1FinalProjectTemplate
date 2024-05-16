
async function vote(companyName) {
    await fetch("/vote", {
        method: "POST",
        body: companyName
    });
}

async function getVotes() {
    let response = await fetch("/getVotes");
    let votes = await response.json();
    return votes;
}
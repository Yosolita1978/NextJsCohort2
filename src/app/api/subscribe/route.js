import Airtable from "airtable";

const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_TOKEN,
});
const base = airtable.base(process.env.AIRTABLE_BASE_ID);
const table = base(process.env.AIRTABLE_TABLE_NAME);


export async function POST(req) {
    try {
        const { name, email } = await req.json();

    //Quick validation
    if (!name || !email) {
        return Response.json({ error: "Missing required fields" }, { status: 400 });
    }   

    //Cre   ate a new record in Airtable
    const newRecord = await table.create({
        "Name": name,
        "Email": email,
    });

    console.log("New record created:", newRecord);

    return Response.json({ message: "Subscription received" }, { status: 200 });
    } catch (error) {
        console.error("Error creating record:", error);
        return Response.json({ error: "Failed to create record" }, { status: 500 });
    }
}
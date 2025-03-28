import { NextResponse } from "next/server";

const WEBSOCKET_URL = "wss://ws.ghostboard.net";
const ADMIN_ID = "2e7312aa-9945-4638-83a1-3caaecdd45b4";

const ALLOWED_ORIGIN = "https://chat.protradingroom.com";


export async function POST(req: Request) {
    try {
        const { symbols, content } = await req.json();

        if (!symbols || !content) {
            return NextResponse.json({ error: "Missing symbols or content" }, { status: 400,headers: {
                    "Access-Control-Allow-Origin": ALLOWED_ORIGIN, 
                    "Access-Control-Allow-Methods": "POST, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type",
                }});
        }

        const alertData = {
            type: "admin",
            adminId: ADMIN_ID,
            alert: {
                symbol: symbols.join(", "), // Sending symbols as a single string
                trend: "", // Default trend (modify as needed)
                content,
            },
        };

        // Send alert via WebSocket
        const ws = new WebSocket(WEBSOCKET_URL);

        ws.onopen = () => {
            console.log("Connected to WebSocket server");
            ws.send(JSON.stringify(alertData));
            ws.close();
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        return NextResponse.json({ success: true, message: "Alert sent successfully" },{
            headers: {
                "Access-Control-Allow-Origin": ALLOWED_ORIGIN, 
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            }
        });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500,headers: {
            "Access-Control-Allow-Origin": ALLOWED_ORIGIN, 
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        } });
    }
}


export function OPTIONS() {
    return NextResponse.json({}, {
        headers: {
            "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        }
    });
}
import React from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-6">
            <Card className="max-w-md w-full shadow-xl border border-muted bg-card">
                <CardContent className="text-center py-12">
                    <h1 className="text-6xl font-bold tracking-tight mb-4">404</h1>
                    <p className="text-muted-foreground text-lg mb-6">
                        The page you're looking for does not exist.
                    </p>
                    <Button onClick={() => navigate("/")} className="gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

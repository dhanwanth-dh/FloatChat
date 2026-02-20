import React, { useState } from 'react'
import 'boxicons'
import Plot from 'react-plotly.js'

const Dashboard = () => {
    const [prompt, setPrompt] = useState('')
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState(null)
    const [sessionId] = useState(() => 'session_' + Date.now())
    const [chatHistory, setChatHistory] = useState([])

    const handleSearch = async () => {
        if (!prompt.trim()) return

        setChatHistory(prev => [...prev, { role: 'user', content: prompt }])
        setLoading(true)

        try {
            const res = await fetch('http://localhost:8000/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt, session_id: sessionId })
            })
            const data = await res.json()
            setResponse(data)
            setChatHistory(prev => [...prev, { role: 'assistant', content: data.summary }])
        } catch (error) {
            console.error('Error:', error)
        }
        setLoading(false)
        setPrompt('')
    }

    const getRiskColor = (score) => {
        if (score >= 70) return 'bg-red-100 border-red-500'
        if (score >= 50) return 'bg-orange-100 border-orange-500'
        if (score >= 30) return 'bg-yellow-100 border-yellow-500'
        return 'bg-green-100 border-green-500'
    }

    return (
        <div className='min-h-screen w-full p-5'>
            <div className='flex flex-col items-center gap-4 mb-8'>
                <div className='flex w-full md:w-[600px] gap-2'>
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        className='bg-white rounded-full w-full h-12 border-2 border-gray-300 px-4'
                        placeholder='Search'
                    />
                    <button
                        onClick={handleSearch}
                        disabled={loading}
                        className='bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 h-12 flex items-center gap-2 disabled:opacity-50'
                    >
                        <box-icon name='search-alt-2' color='white'></box-icon>
                        {loading ? 'Loading...' : 'Search'}
                    </button>
                </div>
            </div>

            {chatHistory.length > 0 && (
                <div className='max-w-7xl mx-auto mb-6'>
                    <div className='bg-white p-4 rounded-lg shadow max-h-60 overflow-y-auto'>
                        <h2 className='text-lg font-bold mb-3'>Conversation History</h2>
                        {chatHistory.map((msg, idx) => (
                            <div key={idx} className={`mb-2 p-2 rounded ${msg.role === 'user' ? 'bg-blue-50 text-right' : 'bg-gray-50'}`}>
                                <span className='font-semibold'>{msg.role === 'user' ? 'You: ' : 'AI: '}</span>
                                <span>{msg.content}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {response && response.query_type === 'external' && (
                <div className='max-w-7xl mx-auto space-y-6'>
                    <div className='bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg shadow-lg border-l-4 border-purple-600'>
                        <h2 className='text-2xl font-bold mb-4 text-purple-800'>🤖 General AI Response</h2>
                        <div className='prose max-w-none whitespace-pre-line text-gray-800'>{response.summary}</div>
                    </div>
                </div>
            )}

            {response && response.query_type === 'intelligent' && (
                <div className='max-w-7xl mx-auto space-y-6'>
                    <div className='bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg shadow-lg border-l-4 border-blue-600'>
                        <h2 className='text-2xl font-bold mb-4 text-blue-800'>🌊 Ocean Intelligence</h2>
                        <div className='prose max-w-none whitespace-pre-line text-gray-800'>{response.summary}</div>
                    </div>
                </div>
            )}

            {response && response.query_type === 'tsunami' && (
                <div className='max-w-7xl mx-auto space-y-6'>
                    <div className='bg-red-50 p-6 rounded-lg shadow border-l-4 border-red-600'>
                        <h2 className='text-2xl font-bold mb-4 text-red-800'>🌊 Tsunami Risk Analysis</h2>
                        <div className='prose max-w-none whitespace-pre-line'>{response.summary}</div>
                    </div>

                    {response.tsunami_risks && response.tsunami_risks.length > 0 && (
                        <div className='bg-white p-6 rounded-lg shadow'>
                            <h2 className='text-xl font-bold mb-4'>Top Risk Regions</h2>
                            <div className='space-y-4'>
                                {response.tsunami_risks.map((risk, idx) => (
                                    <div key={idx} className={`p-4 rounded-lg border-l-4 ${getRiskColor(risk.risk_score)}`}>
                                        <div className='flex justify-between items-start mb-2'>
                                            <h3 className='text-lg font-bold'>#{idx + 1} {risk.region}</h3>
                                            <span className='text-2xl font-bold'>{risk.risk_score}/100</span>
                                        </div>
                                        <p className='text-sm text-gray-600 mb-2'>Confidence: {risk.confidence}% | Data Points: {risk.data_points}</p>
                                        <div className='grid grid-cols-3 gap-2 mt-3'>
                                            <div className='bg-white p-2 rounded'>
                                                <p className='text-xs text-gray-600'>Pressure Anomaly</p>
                                                <p className='font-bold'>{risk.indicators.pressure_anomaly}</p>
                                            </div>
                                            <div className='bg-white p-2 rounded'>
                                                <p className='text-xs text-gray-600'>Temp Variation</p>
                                                <p className='font-bold'>{risk.indicators.temp_variation}°C</p>
                                            </div>
                                            <div className='bg-white p-2 rounded'>
                                                <p className='text-xs text-gray-600'>Salinity Variation</p>
                                                <p className='font-bold'>{risk.indicators.salinity_variation}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {response.recommendations && (
                        <div className='bg-blue-50 p-6 rounded-lg shadow'>
                            <h2 className='text-xl font-bold mb-3'>Recommendations</h2>
                            <ul className='list-disc list-inside space-y-2'>
                                {response.recommendations.map((rec, idx) => (
                                    <li key={idx} className='text-gray-700'>{rec}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            {response && response.query_type === 'general' && (
                <div className='max-w-7xl mx-auto space-y-6'>
                    <div className='bg-white p-6 rounded-lg shadow'>
                        <h2 className='text-xl font-bold mb-3'>Summary</h2>
                        <p className='text-gray-700'>{response.summary}</p>
                        {response.stats && (
                            <p className='text-sm text-gray-500 mt-2'>Analyzed {response.stats.total_records} total records</p>
                        )}
                    </div>

                    {response.location_insights && (
                        <div className='bg-blue-50 p-6 rounded-lg shadow'>
                            <h2 className='text-xl font-bold mb-3'>Location Insights</h2>
                            <p className='text-gray-700'>{response.location_insights}</p>
                        </div>
                    )}

                    {response.issues && response.issues.length > 0 && (
                        <div className='bg-yellow-50 p-6 rounded-lg shadow'>
                            <h2 className='text-xl font-bold mb-3'>Current Issues</h2>
                            {response.issues.map((issue, idx) => (
                                <div key={idx} className='mb-2 p-3 bg-white rounded border-l-4 border-yellow-500'>
                                    <p className='font-semibold'>{issue.message}</p>
                                    <p className='text-sm text-gray-600'>Value: {issue.value}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {response.probabilities && Object.keys(response.probabilities).length > 0 && (
                        <div className='bg-white p-6 rounded-lg shadow'>
                            <h2 className='text-xl font-bold mb-3'>Probability Statistics</h2>
                            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                                <div className='p-3 bg-gray-50 rounded'>
                                    <p className='text-sm text-gray-600'>Mean</p>
                                    <p className='text-lg font-bold'>{response.probabilities.mean}</p>
                                </div>
                                <div className='p-3 bg-gray-50 rounded'>
                                    <p className='text-sm text-gray-600'>Median</p>
                                    <p className='text-lg font-bold'>{response.probabilities.median}</p>
                                </div>
                                <div className='p-3 bg-gray-50 rounded'>
                                    <p className='text-sm text-gray-600'>Std Dev</p>
                                    <p className='text-lg font-bold'>{response.probabilities.std}</p>
                                </div>
                                <div className='p-3 bg-gray-50 rounded'>
                                    <p className='text-sm text-gray-600'>90th %ile</p>
                                    <p className='text-lg font-bold'>{response.probabilities.p90}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className='grid md:grid-cols-2 gap-6'>
                        {response.heatmap && (
                            <div className='bg-white p-4 rounded-lg shadow'>
                                <h2 className='text-xl font-bold mb-3'>Geographic Heatmap</h2>
                                <div className='w-full overflow-hidden'>
                                    <Plot data={JSON.parse(response.heatmap).data} layout={JSON.parse(response.heatmap).layout} config={{ responsive: true }} style={{ width: '100%', height: '100%' }} useResizeHandler={true} />
                                </div>
                            </div>
                        )}

                        {response.chart && (
                            <div className='bg-white p-4 rounded-lg shadow'>
                                <h2 className='text-xl font-bold mb-3'>Depth Profile</h2>
                                <div className='w-full overflow-hidden'>
                                    <Plot data={JSON.parse(response.chart).data} layout={JSON.parse(response.chart).layout} config={{ responsive: true }} style={{ width: '100%', height: '100%' }} useResizeHandler={true} />
                                </div>
                            </div>
                        )}
                    </div>

                    {response.probability_distribution && (
                        <div className='bg-white p-4 rounded-lg shadow'>
                            <h2 className='text-xl font-bold mb-3'>Value Distribution</h2>
                            <div className='w-full overflow-hidden'>
                                <Plot data={JSON.parse(response.probability_distribution).data} layout={JSON.parse(response.probability_distribution).layout} config={{ responsive: true }} style={{ width: '100%', height: '100%' }} useResizeHandler={true} />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Dashboard

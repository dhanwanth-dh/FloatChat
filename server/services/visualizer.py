import plotly.graph_objects as go
import plotly.express as px
import pandas as pd
import numpy as np

def temperature_depth_plot(df: pd.DataFrame):
    """Generate temperature vs depth plot"""
    if df.empty or "pressure" not in df.columns:
        return None
    
    variable = "temperature" if "temperature" in df.columns else "salinity"
    if variable not in df.columns:
        return None
    
    fig = go.Figure()
    fig.add_trace(go.Scatter(
        x=df[variable],
        y=df["pressure"],
        mode="markers",
        marker=dict(size=4, color=df[variable], colorscale="Viridis"),
        name=variable.capitalize()
    ))
    
    fig.update_layout(
        title=f"{variable.capitalize()} vs Depth",
        xaxis_title=f"{variable.capitalize()} ({'°C' if variable == 'temperature' else 'PSU'})",
        yaxis_title="Depth (dbar)",
        yaxis=dict(autorange="reversed"),
        height=400,
        template="plotly_white"
    )
    
    return fig.to_json()

def generate_heatmap(df: pd.DataFrame, variable: str):
    """Generate geographic heatmap"""
    if df.empty or variable not in df.columns:
        return None
    
    if "latitude" not in df.columns or "longitude" not in df.columns:
        return None
    
    fig = go.Figure(go.Densitymapbox(
        lat=df["latitude"],
        lon=df["longitude"],
        z=df[variable],
        radius=15,
        colorscale="Viridis",
        showscale=True,
        colorbar=dict(title=variable.capitalize())
    ))
    
    fig.update_layout(
        mapbox_style="open-street-map",
        mapbox=dict(
            center=dict(lat=df["latitude"].mean(), lon=df["longitude"].mean()),
            zoom=3
        ),
        height=400,
        margin={"r":0,"t":30,"l":0,"b":0},
        title=f"{variable.capitalize()} Heatmap"
    )
    
    return fig.to_json()

def generate_probability_distribution(df: pd.DataFrame, variable: str):
    """Generate probability distribution histogram"""
    if df.empty or variable not in df.columns:
        return None
    
    fig = go.Figure()
    fig.add_trace(go.Histogram(
        x=df[variable],
        nbinsx=30,
        name="Distribution",
        marker_color="#3b82f6",
        opacity=0.7
    ))
    
    fig.update_layout(
        title=f"{variable.capitalize()} Probability Distribution",
        xaxis_title=variable.capitalize(),
        yaxis_title="Frequency",
        height=300,
        template="plotly_white",
        showlegend=False
    )
    
    return fig.to_json()

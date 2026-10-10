"""
API Views for the fintech website.
"""

import json
import random
import string
from datetime import datetime, timedelta
from typing import Any, Dict, List

from django.core.mail import send_mail
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


def _generate_stock_data(days: int = 30) -> List[Dict[str, Any]]:
    """Generate realistic mock stock price data."""
    base_price = 150.0
    data = []
    now = datetime.now()
    for i in range(days):
        date = now - timedelta(days=days - i)
        change = random.uniform(-2.5, 2.5)
        base_price = max(50, base_price + change)
        volume = random.randint(800000, 5000000)
        data.append({
            'date': date.strftime('%Y-%m-%d'),
            'price': round(base_price, 2),
            'volume': volume,
            'change': round(change, 2),
            'changePercent': round((change / base_price) * 100, 2),
        })
    return data


def _generate_market_indices() -> List[Dict[str, Any]]:
    """Generate mock market index data."""
    indices = [
        {'name': 'S&P 500', 'value': round(random.uniform(4500, 5200), 2), 'change': round(random.uniform(-1.5, 1.5), 2)},
        {'name': 'NASDAQ', 'value': round(random.uniform(13500, 15500), 2), 'change': round(random.uniform(-2, 2), 2)},
        {'name': 'Dow Jones', 'value': round(random.uniform(33000, 36000), 2), 'change': round(random.uniform(-1, 1), 2)},
        {'name': 'Russell 2000', 'value': round(random.uniform(1800, 2100), 2), 'change': round(random.uniform(-1.5, 1.5), 2)},
    ]
    return indices


def _generate_portfolio_data() -> List[Dict[str, Any]]:
    """Generate mock portfolio performance data."""
    sectors = ['Technology', 'Healthcare', 'Finance', 'Energy', 'Consumer', 'Industrial', 'Real Estate', 'Utilities']
    data = []
    for sector in sectors:
        allocation = random.uniform(5, 20)
        return_pct = random.uniform(-15, 30)
        data.append({
            'sector': sector,
            'allocation': round(allocation, 1),
            'return': round(return_pct, 1),
            'risk': round(random.uniform(8, 25), 1),
        })
    return data


def _generate_financial_metrics() -> Dict[str, Any]:
    """Generate mock extracted financial metrics from documents."""
    return {
        'revenue': {
            'current': round(random.uniform(1e9, 5e9), 0),
            'previous': round(random.uniform(800e6, 4.5e9), 0),
            'growth': round(random.uniform(-5, 25), 1),
        },
        'netIncome': {
            'current': round(random.uniform(100e6, 800e6), 0),
            'previous': round(random.uniform(80e6, 700e6), 0),
            'growth': round(random.uniform(-10, 30), 1),
        },
        'ebitda': {
            'current': round(random.uniform(200e6, 1.5e9), 0),
            'previous': round(random.uniform(150e6, 1.3e9), 0),
            'growth': round(random.uniform(-5, 20), 1),
        },
        'ratios': {
            'currentRatio': round(random.uniform(1.2, 3.5), 2),
            'debtToEquity': round(random.uniform(0.3, 2.0), 2),
            'roe': round(random.uniform(5, 25), 1),
            'roi': round(random.uniform(8, 35), 1),
        },
        'confidence': round(random.uniform(85, 98), 1),
        'extractedAt': datetime.now().isoformat(),
    }


# ─── API VIEWS ──────────────────────────────────────────────────────

@api_view(['GET'])
def market_overview(request):
    """Return mock market overview data."""
    return Response({
        'indices': _generate_market_indices(),
        'stockData': _generate_stock_data(60),
        'lastUpdated': datetime.now().isoformat(),
        'status': 'live',
    })


@api_view(['GET'])
def get_features(request):
    """Return platform features."""
    features = [
        {
            'id': 1,
            'title': 'Proprietary Market Models',
            'description': 'In-house developed quantitative models for trend detection, sentiment analysis, and signal generation tailored to specific asset classes.',
            'icon': 'chart',
            'category': 'market-intelligence',
        },
        {
            'id': 2,
            'title': 'Document Intelligence Engine',
            'description': 'AI-powered extraction and analysis of financial statements, trade reports, portfolios, and contracts with structured output.',
            'icon': 'document',
            'category': 'document-intelligence',
        },
        {
            'id': 3,
            'title': 'Financial Analytics Platform',
            'description': 'Unified analytics combining market data, company data, documents, and historical records into actionable financial insights.',
            'icon': 'analytics',
            'category': 'analytics',
        },
        {
            'id': 4,
            'title': 'Private AI Infrastructure',
            'description': 'On-premise deployment option with local model execution, ensuring sensitive financial data never leaves your controlled environment.',
            'icon': 'shield',
            'category': 'security',
        },
        {
            'id': 5,
            'title': 'Risk Analysis Engine',
            'description': 'Comprehensive risk assessment including exposure analysis, VaR calculations, and portfolio risk attribution.',
            'icon': 'alert',
            'category': 'analytics',
        },
        {
            'id': 6,
            'title': 'Automated Reporting',
            'description': 'Generate executive dashboards, performance reports, and compliance documents automatically from real-time data.',
            'icon': 'report',
            'category': 'analytics',
        },
    ]
    return Response(features)


@api_view(['GET'])
def get_testimonials(request):
    """Return mock testimonials."""
    testimonials = [
        {
            'id': 1,
            'quote': 'The proprietary market models have significantly improved our signal quality. The ability to run everything on-premise was a critical requirement for us.',
            'author': 'Chief Investment Officer',
            'role': 'Multi-Asset Investment Firm',
            'type': 'investment-firm',
        },
        {
            'id': 2,
            'quote': 'Document intelligence cut our financial statement review time by 70%. The accuracy of extraction across different document formats is exceptional.',
            'author': 'Head of Research',
            'role': 'Hedge Fund',
            'type': 'hedge-fund',
        },
        {
            'id': 3,
            'quote': 'Finally, an analytics platform that understands the sensitivity of financial data. Local deployment gave us the control we needed.',
            'author': 'Managing Partner',
            'role': 'Family Office',
            'type': 'family-office',
        },
    ]
    return Response(testimonials)


@api_view(['GET'])
def get_models_info(request):
    """Return information about proprietary models."""
    models = [
        {
            'name': 'TrendForge',
            'type': 'Market Intelligence',
            'description': 'Proprietary trend detection and pattern recognition model trained on multi-decade market data.',
            'capabilities': ['Trend detection', 'Volume analysis', 'Momentum signals', 'Pattern recognition'],
        },
        {
            'name': 'DocuMind Finance',
            'type': 'Document Intelligence',
            'description': 'Specialized document understanding model fine-tuned for financial statements and reports.',
            'capabilities': ['Financial statement parsing', 'Data extraction', 'Cross-document validation', 'Anomaly detection'],
        },
        {
            'name': 'RiskLens',
            'type': 'Risk Analysis',
            'description': 'Quantitative risk model for portfolio exposure analysis and stress testing.',
            'capabilities': ['VaR calculation', 'Stress testing', 'Exposure analysis', 'Correlation analysis'],
        },
        {
            'name': 'Sentinel AI',
            'type': 'Market Sentiment',
            'description': 'Sentiment analysis model combining news, filings, and market data.',
            'capabilities': ['News sentiment', 'Filing analysis', 'Earnings call analysis', 'Social signal processing'],
        },
    ]
    return Response(models)


@api_view(['GET'])
def get_solutions(request):
    """Return solutions by client type."""
    solutions = [
        {
            'clientType': 'Trading Firms',
            'useCases': [
                'Real-time market signal generation',
                'Trade analytics and performance attribution',
                'Portfolio risk monitoring',
                'Market sentiment analysis',
            ],
        },
        {
            'clientType': 'Investment Firms',
            'useCases': [
                'Proprietary model deployment',
                'Financial document analysis',
                'Automated research workflows',
                'Performance reporting',
            ],
        },
        {
            'clientType': 'Family Offices',
            'useCases': [
                'Portfolio analytics',
                'Private document processing',
                'On-premise deployment',
                'Unified reporting',
            ],
        },
        {
            'clientType': 'Financial Institutions',
            'useCases': [
                'Compliance document analysis',
                'Risk modeling',
                'Secure AI infrastructure',
                'Audit-ready processing',
            ],
        },
    ]
    return Response(solutions)


@api_view(['GET'])
def get_security_features(request):
    """Return security features."""
    features = [
        {'name': 'On-Premise Deployment', 'description': 'Full deployment within your infrastructure with no mandatory cloud dependency.'},
        {'name': 'Network Isolation', 'description': 'Configurable network isolation with private subnet deployment options.'},
        {'name': 'Enterprise Authentication', 'description': 'SSO, LDAP, and custom identity provider integration.'},
        {'name': 'Role-Based Access Control', 'description': 'Granular role-based permissions at model, data, and feature levels.'},
        {'name': 'Encryption at Rest & Transit', 'description': 'Full encryption for stored data and all API communications.'},
        {'name': 'Audit Logging', 'description': 'Comprehensive audit trail for all model accesses, queries, and operations.'},
        {'name': 'API Access Controls', 'description': 'Rate limiting, token management, and private API gateway configuration.'},
        {'name': 'Local Model Execution', 'description': 'All models execute locally with configurable inference capacity.'},
        {'name': 'Data Governance', 'description': 'Built-in data lineage, retention policies, and governance controls.'},
        {'name': 'Model Access Controls', 'description': 'Controlled model deployment, versioning, and access management.'},
    ]
    return Response(features)


@api_view(['POST'])
def contact_submit(request):
    """Handle contact form submission."""
    try:
        data = request.data
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        company = data.get('company', '').strip()
        message = data.get('message', '').strip()
        interest = data.get('interest', '').strip()

        if not name or not email or not message:
            return Response(
                {'success': False, 'error': 'Name, email, and message are required.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # In production: send email, store in database, etc.
        print(f"[CONTACT] Name: {name}, Email: {email}, Company: {company}, Interest: {interest}")
        print(f"[CONTACT] Message: {message}")

        return Response({
            'success': True,
            'message': 'Thank you for reaching out. Our team will contact you within 24 hours.',
        })
    except Exception as exc:
        return Response(
            {'success': False, 'error': str(exc)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(['POST'])
def demo_request(request):
    """Handle demo request submission."""
    try:
        data = request.data
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        company = data.get('company', '').strip()
        role = data.get('role', '').strip()
        use_case = data.get('useCase', '').strip()

        if not name or not email:
            return Response(
                {'success': False, 'error': 'Name and email are required.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        print(f"[DEMO] Name: {name}, Email: {email}, Company: {company}, Role: {role}, Use Case: {use_case}")

        return Response({
            'success': True,
            'message': 'Your demo request has been received. Our team will reach out within 48 hours.',
        })
    except Exception as exc:
        return Response(
            {'success': False, 'error': str(exc)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

"""
Extended ESG research checklist: detailed
research scopes used by the Research Agent.
"""

from typing import Optional
from pydantic import BaseModel, Field

# ------------------------------------------------------------------
# Helper datatype: simple optional string with description
# ------------------------------------------------------------------

def _rf(desc: str) -> tuple[Optional[str], Field]:
    """
    Convenience wrapper so every field is
    Optional[str] with default None + description.
    """
    return (Optional[str], Field(default=None, description=desc))

# ------------------------------------------------------------------
# 1. Regulation Research
# ------------------------------------------------------------------

class RegulationResearch(BaseModel):
    """Regulatory landscape impacting ESG performance."""
    frameworks:               Optional[str] = Field(
        default=None,
        description="Relevant sustainability disclosure frameworks "
                    "(e.g. SDG, GRI)."
    )
    regional_policies:        Optional[str] = Field(
        default=None,
        description="ESG-related laws and policies by country or region."
    )
    sectoral_regulations:     Optional[str] = Field(
        default=None,
        description="Industry-specific regulations (emissions caps, "
                    "green-finance rules, etc.)."
    )
    compliance_benchmarks:    Optional[str] = Field(
        default=None,
        description="How prepared the company is vs. peers or legal "
                    "standards. Give at least 1"
    )

# ------------------------------------------------------------------
# 2. Societal Expectations Research
# ------------------------------------------------------------------

class SocietalExpectationsResearch(BaseModel):
    """Societal trends and public opinion on sustainability issues."""
    ngo_campaigns:            Optional[str] = Field(
        default=None,
        description="NGO-led movements or pressure campaigns relevant "
                    "to the company or industry. Give credit to what the company done"
                    
    )
    civil_society_issues:     Optional[str] = Field(
        default=None,
        description="Rising civil-society concerns (human rights, plastic "
                    "pollution, climate migration, etc.)."
    )
    cultural_norms_shift:     Optional[str] = Field(
        default=None,
        description="Emerging or accelerating value shifts (zero-waste, "
                    "decolonisation in business, etc.)."
    )

# ------------------------------------------------------------------
# 3. Stakeholder Pressure Analysis
# ------------------------------------------------------------------

class StakeholderPressureAnalysis(BaseModel):
    """ESG-related expectations & influence across stakeholder groups."""
    client_demands:           Optional[str] = Field( ## ask this.
        default=None,
        description="ESG requirements embedded in customer contracts, "
                    "procurement, or product standards."
    )
    competitor_signals:       Optional[str] = Field(
        default=None,
        description="ESG disclosures, ratings, or practices from peers."
    )
    government_influence:     Optional[str] = Field(
        default=None,
        description="Pressure via regulation, lobbying, or public-private "
                    "initiatives."
    )
    investor_expectations:    Optional[str] = Field( ##
        default=None,
        description="ESG criteria used by investors or shareholder "
                    "resolutions."
    )
    industry_group_agendas:   Optional[str] = Field(
        default=None,
        description="Sector-wide pledges, lobbying, or collaboration on ESG."
        " okay if none"
    )

# ------------------------------------------------------------------
# 4. Industry Forces Analysis
# ------------------------------------------------------------------

class IndustryForcesAnalysis(BaseModel):
    """Strategic industry environment viewed through an ESG lens."""
    competitive_differentiation: Optional[str] = Field(
        default=None,
        description="How ESG can be used as a product or brand advantage."
    )
    supply_chain_risk:          Optional[str] = Field(
        default=None,
        description="ESG-related disruption risk in the supply chain."
    )
    regulatory_barriers:        Optional[str] = Field(
        default=None,
        description="ESG rules acting as market-entry barriers or moats."
    )
    substitution_risk:          Optional[str] = Field(
        default=None,
        description="Risk of customers switching to more sustainable "
                    "alternatives."
    )
    Opportunity :          Optional[str] = Field(
        default=None,
        description="Potential for new revenue streams or business expansion due"
                    "adopting ESG practises."
    )

# ------------------------------------------------------------------
# Combined “Research Scopes” container
# ------------------------------------------------------------------

class ResearchScopes(BaseModel):
    """
    Detailed research scopes filled by the agent.
    Each sub-model can be populated via RAG,
    web-search, or direct user input.
    """
    regulation: RegulationResearch = Field(default_factory=RegulationResearch)
    societal_expectations: SocietalExpectationsResearch = Field(
        default_factory=SocietalExpectationsResearch
    )
    stakeholder_pressure: StakeholderPressureAnalysis = Field(
        default_factory=StakeholderPressureAnalysis
    )
    industry_forces: IndustryForcesAnalysis = Field(
        default_factory=IndustryForcesAnalysis
    )

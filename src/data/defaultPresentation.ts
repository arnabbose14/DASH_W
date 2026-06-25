import type { Presentation } from '../types';

export const defaultPresentation: Presentation = {
  "title": "W BY GROWW - Alpha Trinity Keynote",
  "theme": {
    "primaryColor": "#05080F",
    "accentColor": "#d4af37",
    "backgroundColor": "#05080F",
    "textColor": "#ffffff",
    "fontHeading": "Inter Tight, sans-serif",
    "fontBody": "Inter Tight, sans-serif"
  },
  "variables": {
    "companyName": "W BY GROWW",
    "heroTitle": "For the <em>top 1% of India</em>",
    "friendValue": "₹2,00,00,000",
    "youValue": "₹3,25,00,000",
    "alphaValue": "₹1,25,00,000",
    "patListed": "42%",
    "patUnlisted": "82%",
    "pms5Y": "₹82.5L",
    "mf5Y": "₹39.2L",
    "index5Y": "₹25.0L",
    "lucknowIRR": "~13.9%",
    "bangaloreIRR": "~16.3%",
    "ahmedabadIRR": "~21.1%"
  },
  "slides": [
    {
      "id": "slide_1_groww_hero",
      "title": "For the top 1% of India",
      "slideType": "hero",
      "motionPreset": "luxury",
      "background": {
        "type": "gradient",
        "value": "radial-gradient(ellipse 60% 55% at 85% 15%, rgba(201,168,76,0.06) 0%, #05080F 65%)",
        "opacity": 1,
        "blur": 0,
        "overlayTint": "#d4af37",
        "overlayOpacity": 0.03,
        "focalPointX": 50,
        "focalPointY": 50,
        "cropMode": "cover"
      },
      "components": [
        {
          "id": "hero_stack",
          "type": "stack",
          "layout": {
            "width": "fill",
            "height": "fill",
            "direction": "column",
            "justifyContent": "center",
            "alignItems": "start",
            "gap": "2cqmin",
            "padding": "8cqmin"
          },
          "dataBindings": {},
          "children": [
            {
              "id": "groww_badge",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fit",
                "height": "fit"
              },
              "localProps": {
                "tag": "div",
                "text": "✦ W by Groww",
                "className": "hero-badge"
              }
            },
            {
              "id": "groww_title",
              "type": "headline",
              "dataBindings": {
                "text": "heroTitle"
              },
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "tag": "h1",
                "className": "hero-title",
                "style": {
                  "textAlign": "center"
                }
              }
            },
            {
              "id": "groww_sub",
              "type": "paragraph",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit",
                "maxWidth": "60%"
              },
              "localProps": {
                "text": "",
                "className": "hero-subtitle"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "slide_2_groww_timeline",
      "title": "IITs & India's Wealth",
      "slideType": "timeline",
      "motionPreset": "premium",
      "background": {
        "type": "color",
        "value": "#05080F",
        "opacity": 1,
        "blur": 0,
        "overlayTint": "#05080F",
        "overlayOpacity": 0,
        "focalPointX": 50,
        "focalPointY": 50,
        "cropMode": "cover"
      },
      "components": [
        {
          "id": "timeline_main_stack",
          "type": "stack",
          "layout": {
            "width": "fill",
            "height": "fill",
            "direction": "column",
            "justifyContent": "between",
            "gap": "1.5cqmin",
            "padding": "0cqmin 1cqmin"
          },
          "dataBindings": {},
          "children": [
            {
              "id": "timeline_heading",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "tag": "h2",
                "text": "As IITs grew, so did India’s wealth — slowly, then all at once",
                "className": "slide-heading"
              }
            },
            {
              "id": "timeline_scroll",
              "type": "timeline",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fill"
              },
              "localProps": {
                "milestones": [
                  {
                    "time": "1951",
                    "title": "IIT Kharagpur",
                    "description": "BSE had just 49 listed companies. Trades were handwritten and settlement took days.",
                    "active": true
                  },
                  {
                    "time": "1958",
                    "title": "IIT Bombay",
                    "description": "Fewer than 200 listed companies. Markets limited to a small network of brokers.",
                    "active": true
                  },
                  {
                    "time": "1961",
                    "title": "IIT Delhi",
                    "description": "Investing remained concentrated in Bombay. For most Indians, the stock market didn't matter.",
                    "active": true
                  },
                  {
                    "time": "1994",
                    "title": "IIT Guwahati",
                    "description": "NSE began operations. Screen-based electronic trading started. ~12-13% annual returns.",
                    "active": true
                  },
                  {
                    "time": "2001",
                    "title": "IIT Roorkee (7th IIT)",
                    "description": "Online trading took shape. Retail investors started gaining access to the markets.",
                    "active": true
                  },
                  {
                    "time": "2008",
                    "title": "Six New IITs",
                    "description": "Over 8,000 listed companies. Mutual funds grew in scale. Retail participation sped up.",
                    "active": true
                  },
                  {
                    "time": "2026",
                    "title": "Today",
                    "description": "23 IITs across India. 21+ crore demat accounts. Among the largest equity markets in the world.",
                    "active": true
                  }
                ],
                "layoutType": "vertical"
              }
            },
            {
              "id": "timeline_callout",
              "type": "kpi",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "label": "Long-term Wealth Creation Performance",
                "value": 35,
                "prefix": "₹1 lakh invested in Nifty in 1995 → ~₹",
                "suffix": " lakh today.",
                "trend": "Source: BSE, NSE, SEBI, NSDL, Economic Survey 2025–26 | Nifty 50 launched in 1996; returns are approximate | As on Dec'25",
                "trendDirection": "up"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "slide_3_groww_transition1",
      "title": "Missing Alpha Transition",
      "slideType": "hero",
      "motionPreset": "luxury",
      "background": {
        "type": "gradient",
        "value": "radial-gradient(ellipse 50% 60% at 20% 80%, rgba(201,168,76,0.05) 0%, #05080F 70%)",
        "opacity": 1,
        "blur": 0,
        "overlayTint": "#d4af37",
        "overlayOpacity": 0.05,
        "focalPointX": 50,
        "focalPointY": 50,
        "cropMode": "cover"
      },
      "components": [
        {
          "id": "t1_stack",
          "type": "stack",
          "layout": {
            "width": "fill",
            "height": "fill",
            "direction": "column",
            "justifyContent": "center",
            "alignItems": "center",
            "gap": "2cqmin",
            "padding": "8cqmin"
          },
          "dataBindings": {},
          "children": [
            {
              "id": "t1_badge",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fit",
                "height": "fit"
              },
              "localProps": {
                "tag": "div",
                "text": "✦ W by Groww",
                "className": "hero-badge"
              }
            },
            {
              "id": "t1_title",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "tag": "h1",
                "text": "The Curious Case of Missing Alpha",
                "className": "hero-title",
                "style": {
                  "textAlign": "center"
                }
              }
            }
          ]
        }
      ]
    },
    {
      "id": "slide_4_groww_alpha_comparison",
      "title": "What is alpha?",
      "slideType": "comparison",
      "motionPreset": "energetic",
      "background": {
        "type": "color",
        "value": "#05080F",
        "opacity": 1,
        "blur": 0,
        "overlayTint": "#05080F",
        "overlayOpacity": 0,
        "focalPointX": 50,
        "focalPointY": 50,
        "cropMode": "cover"
      },
      "components": [
        {
          "id": "alpha_stack",
          "type": "stack",
          "layout": {
            "width": "fill",
            "height": "fill",
            "direction": "column",
            "justifyContent": "between",
            "gap": "3cqmin",
            "padding": "5cqmin"
          },
          "dataBindings": {},
          "children": [
            {
              "id": "alpha_title",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "tag": "h2",
                "text": "What is <em>alpha</em>? | Let's invest ₹1 Crore in equity",
                "className": "slide-heading"
              }
            },
            {
              "id": "alpha_cols",
              "type": "columns",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fill",
                "gap": "3cqmin"
              },
              "localProps": {
                "widths": [
                  "68%",
                  "32%"
                ]
              },
              "children": [
                {
                  "id": "alpha_comparison_widget",
                  "type": "comparison-chart",
                  "dataBindings": {
                    "leftValue": "friendValue",
                    "rightValue": "youValue"
                  },
                  "layout": {
                    "width": "fill",
                    "height": "fill"
                  },
                  "localProps": {
                    "leftTitle": "Your Friend",
                    "leftSubtitle": "Equity Index ETF (a.k.a Benchmark Nifty 500)",
                    "leftUnit": "",
                    "leftList": [
                      "I don't understand markets much. I will buy the entire basket!",
                      "Current Value: ₹2,00,00,000"
                    ],
                    "rightTitle": "You",
                    "rightSubtitle": "Actively Managed Portfolio",
                    "rightUnit": "",
                    "rightList": [
                      "I will do my research, take help and create a portfolio that will create wealth!",
                      "Stocks, flexi-cap mutual funds, mid/small-cap, mutual funds, and more",
                      "Current Value: ₹3,25,00,000"
                    ]
                  }
                },
                {
                  "id": "alpha_callout",
                  "type": "kpi",
                  "dataBindings": {
                    "value": "alphaValue"
                  },
                  "layout": {
                    "width": "fill",
                    "height": "fill"
                  },
                  "localProps": {
                    "label": "Alpha",
                    "trend": "additional earned over the benchmark index",
                    "trendDirection": "up"
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "slide_5_groww_bse500",
      "title": "Not all stocks are equal",
      "slideType": "chart",
      "motionPreset": "executive",
      "background": {
        "type": "color",
        "value": "#05080F",
        "opacity": 1,
        "blur": 0,
        "overlayTint": "#05080F",
        "overlayOpacity": 0,
        "focalPointX": 50,
        "focalPointY": 50,
        "cropMode": "cover"
      },
      "components": [
        {
          "id": "bse_stack",
          "type": "stack",
          "layout": {
            "width": "fill",
            "height": "fill",
            "direction": "column",
            "justifyContent": "between",
            "gap": "3cqmin",
            "padding": "5cqmin"
          },
          "dataBindings": {},
          "children": [
            {
              "id": "bse_title",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "tag": "h2",
                "text": "Not all stocks are created equal",
                "className": "slide-heading"
              }
            },
            {
              "id": "bse_cols",
              "type": "columns",
              "layout": {
                "width": "fill",
                "height": "fill",
                "gap": "4cqmin",
                "alignItems": "stretch"
              },
              "dataBindings": {},
              "localProps": {
                "widths": [
                  "40%",
                  "60%"
                ]
              },
              "children": [
                {
                  "id": "bse_stats",
                  "type": "stack",
                  "layout": {
                    "width": "fill",
                    "height": "fill",
                    "direction": "column",
                    "gap": "3cqmin",
                    "justifyContent": "between"
                  },
                  "dataBindings": {},
                  "children": [
                    {
                      "id": "bse_kpi_1",
                      "type": "kpi",
                      "dataBindings": {},
                      "layout": {
                        "width": "fill",
                        "height": "fit"
                      },
                      "localProps": {
                        "label": "BSE 500 Index",
                        "value": 14.5,
                        "suffix": "%",
                        "trend": "5Y Benchmark CAGR"
                      }
                    },
                    {
                      "id": "bse_kpi_2",
                      "type": "kpi",
                      "dataBindings": {},
                      "layout": {
                        "width": "fill",
                        "height": "fit"
                      },
                      "localProps": {
                        "label": "Outperformance Share",
                        "value": 50,
                        "suffix": "%",
                        "trend": "of stocks delivering > 14.5% CAGR"
                      }
                    }
                  ]
                },
                {
                  "id": "bse_chart_stack",
                  "type": "stack",
                  "layout": {
                    "width": "fill",
                    "height": "fill",
                    "direction": "column",
                    "gap": "1cqmin",
                    "alignItems": "center",
                    "justifyContent": "center"
                  },
                  "dataBindings": {},
                  "children": [
                    {
                      "id": "bse_chart_header",
                      "type": "headline",
                      "dataBindings": {},
                      "layout": {
                        "width": "fit",
                        "height": "fit"
                      },
                      "localProps": {
                        "tag": "div",
                        "text": "BSE 500 | 5Y CAGR vs % of total stocks",
                        "className": "bse-chart-header-pill"
                      }
                    },
                    {
                      "id": "bse_chart",
                      "type": "bar-chart",
                      "dataBindings": {},
                      "layout": {
                        "width": "fill",
                        "height": "fill"
                      },
                      "localProps": {
                        "data": [
                          {
                            "label": "<0",
                            "value": 8,
                            "highlight": false
                          },
                          {
                            "label": "0 to 10",
                            "value": 33,
                            "highlight": false
                          },
                          {
                            "label": "10 to 20",
                            "value": 19,
                            "highlight": false
                          },
                          {
                            "label": "20 to 30",
                            "value": 16,
                            "highlight": false
                          },
                          {
                            "label": "30 to 50",
                            "value": 15,
                            "highlight": true
                          },
                          {
                            "label": "50-100",
                            "value": 8,
                            "highlight": false
                          },
                          {
                            "label": "100-200",
                            "value": 1,
                            "highlight": false
                          },
                          {
                            "label": ">200",
                            "value": 0,
                            "highlight": false
                          }
                        ],
                        "unit": "%",
                        "maxValue": 40,
                        "layoutType": "vertical"
                      }
                    }
                  ]
                }
              ]
            },
            {
              "id": "bse_footer",
              "type": "paragraph",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "text": "(Source: NSE, W Research | Data as on 19 Feb'26)",
                "className": "slide-paragraph"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "slide_6_groww_hni_cohort",
      "title": "HNI vs Institutional Intelligence",
      "slideType": "chart",
      "motionPreset": "executive",
      "background": {
        "type": "color",
        "value": "#05080F",
        "opacity": 1,
        "blur": 0,
        "overlayTint": "#05080F",
        "overlayOpacity": 0,
        "focalPointX": 50,
        "focalPointY": 50,
        "cropMode": "cover"
      },
      "components": [
        {
          "id": "hni_stack",
          "type": "stack",
          "layout": {
            "width": "fill",
            "height": "fill",
            "direction": "column",
            "justifyContent": "between",
            "gap": "3cqmin",
            "padding": "5cqmin"
          },
          "dataBindings": {},
          "children": [
            {
              "id": "hni_title",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "tag": "h2",
                "text": "In stocks, the HNI cohort has been losing out to institutional intelligence",
                "className": "slide-heading"
              }
            },
            {
              "id": "hni_chart_stack",
              "type": "stack",
              "layout": {
                "width": "fill",
                "height": "fill",
                "direction": "column",
                "gap": "1.5cqmin",
                "alignItems": "center"
              },
              "dataBindings": {},
              "children": [
                {
                  "id": "hni_chart_header",
                  "type": "headline",
                  "dataBindings": {},
                  "layout": {
                    "width": "fit",
                    "height": "fit"
                  },
                  "localProps": {
                    "tag": "div",
                    "text": "2Y Change (%)",
                    "className": "bse-chart-header-pill"
                  }
                },
                {
                  "id": "hni_chart",
                  "type": "bar-chart",
                  "dataBindings": {},
                  "layout": {
                    "width": "fill",
                    "height": "fill",
                    "padding": "16cqmin"
                  },
                  "localProps": {
                    "data": [
                      {
                        "label": "HNI (Increase); Institution (Reduce)",
                        "value": -30,
                        "highlight": false
                      },
                      {
                        "label": "Institution (Increase); HNI (Reduce)",
                        "value": 46,
                        "highlight": true
                      }
                    ],
                    "unit": "%",
                    "maxValue": 50,
                    "layoutType": "horizontal"
                  }
                }
              ]
            },
            {
              "id": "hni_footer",
              "type": "paragraph",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "text": "(Source: Trendlyne, W Research | Increase refers to increase of >5% absolute over 8Q | Reduce refers to a reduction of < -5% over 8Q; as on Feb'26)",
                "className": "slide-paragraph"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "slide_7_groww_mf_managers",
      "title": "HNI vs Mutual Funds",
      "slideType": "chart",
      "motionPreset": "executive",
      "background": {
        "type": "color",
        "value": "#05080F",
        "opacity": 1,
        "blur": 0,
        "overlayTint": "#05080F",
        "overlayOpacity": 0,
        "focalPointX": 50,
        "focalPointY": 50,
        "cropMode": "cover"
      },
      "components": [
        {
          "id": "mf_stack",
          "type": "stack",
          "layout": {
            "width": "fill",
            "height": "fill",
            "direction": "column",
            "justifyContent": "between",
            "gap": "3cqmin",
            "padding": "5cqmin"
          },
          "dataBindings": {},
          "children": [
            {
              "id": "mf_title",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "tag": "h2",
                "text": "The story is similar versus mutual fund managers as well",
                "className": "slide-heading"
              }
            },
            {
              "id": "mf_chart_stack",
              "type": "stack",
              "layout": {
                "width": "fill",
                "height": "fill",
                "direction": "column",
                "gap": "1.5cqmin",
                "alignItems": "center"
              },
              "dataBindings": {},
              "children": [
                {
                  "id": "mf_chart_header",
                  "type": "headline",
                  "dataBindings": {},
                  "layout": {
                    "width": "fit",
                    "height": "fit"
                  },
                  "localProps": {
                    "tag": "div",
                    "text": "2Y Change (%)",
                    "className": "bse-chart-header-pill"
                  }
                },
                {
                  "id": "mf_chart",
                  "type": "bar-chart",
                  "dataBindings": {},
                  "layout": {
                    "width": "fill",
                    "height": "fill",
                    "padding": "16cqmin"
                  },
                  "localProps": {
                    "data": [
                      {
                        "label": "HNI (Increase); MF (Reduce)",
                        "value": -9,
                        "highlight": false
                      },
                      {
                        "label": "MF (Increase); HNI (Reduce)",
                        "value": 39,
                        "highlight": true
                      }
                    ],
                    "unit": "%",
                    "maxValue": 50,
                    "layoutType": "horizontal"
                  }
                }
              ]
            },
            {
              "id": "mf_footer",
              "type": "paragraph",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "text": "(Source: Trendlyne, W Research | Increase refers to increase of >5% absolute over 8Q | Reduce refers to a reduction of < - 5% over 8Q; as on Feb'26)",
                "className": "slide-paragraph"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "slide_8_groww_unlisted",
      "title": "Listed vs Unlisted Leaders",
      "slideType": "chart",
      "motionPreset": "premium",
      "background": {
        "type": "color",
        "value": "#05080F",
        "opacity": 1,
        "blur": 0,
        "overlayTint": "#05080F",
        "overlayOpacity": 0,
        "focalPointX": 50,
        "focalPointY": 50,
        "cropMode": "cover"
      },
      "components": [
        {
          "id": "unlisted_stack",
          "type": "stack",
          "layout": {
            "width": "fill",
            "height": "fill",
            "direction": "column",
            "justifyContent": "between",
            "gap": "3cqmin",
            "padding": "5cqmin"
          },
          "dataBindings": {},
          "children": [
            {
              "id": "unlisted_title",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "tag": "h2",
                "text": "Equity extends well beyond public markets",
                "className": "slide-heading"
              }
            },
            {
              "id": "unlisted_cols",
              "type": "columns",
              "layout": {
                "width": "fill",
                "height": "fill",
                "gap": "4cqmin",
                "alignItems": "center"
              },
              "dataBindings": {},
              "localProps": {
                "widths": [
                  "40%",
                  "60%"
                ]
              },
              "children": [
                {
                  "id": "unlisted_chart_stack",
                  "type": "stack",
                  "layout": {
                    "width": "fill",
                    "height": "fill",
                    "direction": "column",
                    "gap": "1.5cqmin",
                    "alignItems": "center"
                  },
                  "dataBindings": {},
                  "children": [
                    {
                      "id": "unlisted_chart_header",
                      "type": "headline",
                      "dataBindings": {},
                      "layout": {
                        "width": "fit",
                        "height": "fit"
                      },
                      "localProps": {
                        "tag": "div",
                        "text": "5Y PAT Growth",
                        "className": "bse-chart-header-pill"
                      }
                    },
                    {
                      "id": "unlisted_chart_pats",
                      "type": "bar-chart",
                      "dataBindings": {},
                      "layout": {
                        "width": "fill",
                        "height": "fill"
                      },
                      "localProps": {
                        "data": [
                          {
                            "label": "Listed",
                            "value": 42,
                            "highlight": false
                          },
                          {
                            "label": "Unlisted",
                            "value": 82,
                            "highlight": true
                          }
                        ],
                        "unit": "%",
                        "maxValue": 100,
                        "layoutType": "vertical"
                      }
                    }
                  ]
                },
                {
                  "id": "unlisted_bullets_container",
                  "type": "stack",
                  "layout": {
                    "width": "fill",
                    "height": "fill",
                    "direction": "column",
                    "gap": "2cqmin",
                    "justifyContent": "center"
                  },
                  "dataBindings": {},
                  "children": [
                    {
                      "id": "unlisted_sub",
                      "type": "headline",
                      "dataBindings": {},
                      "layout": {
                        "width": "fill",
                        "height": "fit"
                      },
                      "localProps": {
                        "tag": "h3",
                        "text": "Not all leaders are listed (yet)"
                      }
                    },
                    {
                      "id": "unlisted_bullets_cols",
                      "type": "columns",
                      "layout": {
                        "width": "fill",
                        "height": "fit",
                        "gap": "3cqmin"
                      },
                      "dataBindings": {},
                      "localProps": {
                        "widths": [
                          "50%",
                          "50%"
                        ]
                      },
                      "children": [
                        {
                          "id": "unlisted_bullets_left",
                          "type": "paragraph",
                          "dataBindings": {},
                          "layout": {
                            "width": "fill",
                            "height": "fit"
                          },
                          "localProps": {
                            "text": "<ul class='slide-bullet-list'><li>India's largest capital markets exchange</li><li>India's largest asset management company</li><li>Leading online entertainment ticketing company</li><li>Top player in the quick commerce category</li></ul>"
                          }
                        },
                        {
                          "id": "unlisted_bullets_right",
                          "type": "paragraph",
                          "dataBindings": {},
                          "layout": {
                            "width": "fill",
                            "height": "fit"
                          },
                          "localProps": {
                            "text": "<ul class='slide-bullet-list'><li>Large, dominant brand in packaged ethnic snacks</li><li>India's largest IVF chain by network size</li><li>Leading education financing NBFC</li><li>And many more...</li></ul>"
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "id": "unlisted_footer",
              "type": "paragraph",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "text": "(Source: CMIE, W Research | Data as of 31st March 2025 | 5Y PAT Growth)",
                "className": "slide-paragraph"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "slide_9_groww_alpha_beyond",
      "title": "Alpha Beyond Equities",
      "slideType": "chart",
      "motionPreset": "premium",
      "background": {
        "type": "color",
        "value": "#05080F",
        "opacity": 1,
        "blur": 0,
        "overlayTint": "#05080F",
        "overlayOpacity": 0,
        "focalPointX": 50,
        "focalPointY": 50,
        "cropMode": "cover"
      },
      "components": [
        {
          "id": "beyond_stack",
          "type": "stack",
          "layout": {
            "width": "fill",
            "height": "fill",
            "direction": "column",
            "justifyContent": "between",
            "gap": "3cqmin",
            "padding": "5cqmin"
          },
          "dataBindings": {},
          "children": [
            {
              "id": "beyond_title",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "tag": "h2",
                "text": "And alpha exists well beyond equities as well",
                "className": "slide-heading"
              }
            },
            {
              "id": "beyond_chart",
              "type": "bar-chart",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fill"
              },
              "localProps": {
                "data": [
                  {
                    "label": "Domestic Silver",
                    "value": 62.7,
                    "highlight": true
                  },
                  {
                    "label": "Domestic Gold",
                    "value": 37.2,
                    "highlight": true
                  },
                  {
                    "label": "Mid Cap",
                    "value": 24.2,
                    "highlight": false
                  },
                  {
                    "label": "Small Cap",
                    "value": 21.2,
                    "highlight": false
                  },
                  {
                    "label": "Large Cap",
                    "value": 15,
                    "highlight": false
                  }
                ],
                "unit": "%",
                "maxValue": 70,
                "layoutType": "vertical"
              }
            },
            {
              "id": "beyond_footer",
              "type": "paragraph",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "text": "(Source: CMIE, Accord W Research | Data as of 31st Jan 2026 | 3Y CAGR (%))",
                "className": "slide-paragraph"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "slide_10_groww_debt_aif",
      "title": "Debt AIF Comparison",
      "slideType": "chart",
      "motionPreset": "executive",
      "background": {
        "type": "color",
        "value": "#05080F",
        "opacity": 1,
        "blur": 0,
        "overlayTint": "#05080F",
        "overlayOpacity": 0,
        "focalPointX": 50,
        "focalPointY": 50,
        "cropMode": "cover"
      },
      "components": [
        {
          "id": "debt_stack",
          "type": "stack",
          "layout": {
            "width": "fill",
            "height": "fill",
            "direction": "column",
            "justifyContent": "between",
            "gap": "3cqmin",
            "padding": "5cqmin"
          },
          "dataBindings": {},
          "children": [
            {
              "id": "groww_logo",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fit",
                "height": "fit"
              },
              "localProps": {
                "tag": "div",
                "text": "<div style='display: flex; flex-direction: column; align-items: start; justify-content: start;'><img src='/groww-logo.png' style='width: 72px; height: 72px; object-fit: contain;' /></div>"
              }
            },
            {
              "id": "debt_title",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "tag": "h2",
                "text": "A similar story here",
                "className": "slide-heading"
              }
            },
            {
              "id": "debt_chart_container",
              "type": "container",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fill",
                "padding": "4cqmin 6cqmin"
              },
              "localProps": {
                "style": {
                  "background": "rgba(5, 8, 15, 0.4)",
                  "border": "1px solid rgba(201, 168, 76, 0.18)",
                  "borderRadius": "20px"
                }
              },
              "children": [
                {
                  "id": "debt_chart",
                  "type": "bar-chart",
                  "dataBindings": {},
                  "layout": {
                    "width": "fill",
                    "height": "fill"
                  },
                  "localProps": {
                    "data": [
                      {
                        "label": "Cat II Debt AIF (Select)",
                        "value": 15.5,
                        "subLabel": "₹15.8L",
                        "highlight": true
                      },
                      {
                        "label": "Best Credit Risk MF",
                        "value": 10.1,
                        "subLabel": "₹13.6L",
                        "highlight": false
                      },
                      {
                        "label": "Credit Risk MF Category Median",
                        "value": 7.3,
                        "subLabel": "₹12.5L",
                        "highlight": false
                      }
                    ],
                    "unit": "%",
                    "maxValue": 20,
                    "layoutType": "vertical"
                  }
                }
              ]
            },
            {
              "id": "debt_kpi_footer",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "tag": "div",
                "text": "Value of ₹10,00,000 in 5Y",
                "style": {
                  "fontWeight": 800,
                  "fontStyle": "italic",
                  "fontSize": "20px",
                  "color": "var(--t2)",
                  "fontFamily": "Inter Tight, sans-serif",
                  "textAlign": "center"
                }
              }
            }
          ]
        }
      ]
    },
    {
      "id": "slide_11_groww_dispersion",
      "title": "Mutual Fund Return Dispersion",
      "slideType": "chart",
      "motionPreset": "premium",
      "background": {
        "type": "color",
        "value": "#05080F",
        "opacity": 1,
        "blur": 0,
        "overlayTint": "#05080F",
        "overlayOpacity": 0,
        "focalPointX": 50,
        "focalPointY": 50,
        "cropMode": "cover"
      },
      "components": [
        {
          "id": "dispersion_stack",
          "type": "stack",
          "layout": {
            "width": "fill",
            "height": "fill",
            "direction": "column",
            "justifyContent": "between",
            "gap": "3cqmin",
            "padding": "5cqmin"
          },
          "dataBindings": {},
          "children": [
            {
              "id": "dispersion_title",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "tag": "h2",
                "text": "Mutual Funds Sahi Hai; but not all of them",
                "className": "slide-heading"
              }
            },
            {
              "id": "dispersion_chart_comp",
              "type": "dispersion-chart",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fill"
              },
              "localProps": {
                "categories": [
                  {
                    "label": "Flexi",
                    "bottomVal": "15L",
                    "topVal": "26L",
                    "diff": "+ 73%"
                  },
                  {
                    "label": "Large",
                    "bottomVal": "16L",
                    "topVal": "23L",
                    "diff": "+ 44%"
                  },
                  {
                    "label": "Mid",
                    "bottomVal": "20L",
                    "topVal": "30L",
                    "diff": "+ 50%"
                  },
                  {
                    "label": "Small",
                    "bottomVal": "22L",
                    "topVal": "32L",
                    "diff": "+ 45%"
                  }
                ]
              }
            },
            {
              "id": "dispersion_footer",
              "type": "paragraph",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "text": "Return dispersion for key categories 5Y growth of ₹10L | (Source: Accord, W Research | Data as on 19 Feb'26)",
                "className": "slide-paragraph",
                "style": {
                  "textAlign": "center",
                  "fontWeight": "600"
                }
              }
            }
          ]
        }
      ]
    },
    {
      "id": "slide_12_groww_participation_strategy",
      "title": "Participation vs Strategy",
      "slideType": "hero",
      "motionPreset": "luxury",
      "background": {
        "type": "gradient",
        "value": "radial-gradient(ellipse 55% 50% at 15% 85%, rgba(201,168,76,0.05) 0%, #05080F 65%)",
        "opacity": 1,
        "blur": 0,
        "overlayTint": "#d4af37",
        "overlayOpacity": 0.05,
        "focalPointX": 50,
        "focalPointY": 50,
        "cropMode": "cover"
      },
      "components": [
        {
          "id": "t12_stack",
          "type": "stack",
          "layout": {
            "width": "fill",
            "height": "fill",
            "direction": "column",
            "justifyContent": "center",
            "alignItems": "center",
            "gap": "3cqmin",
            "padding": "8cqmin"
          },
          "dataBindings": {},
          "children": [
            {
              "id": "t12_badge",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fit",
                "height": "fit"
              },
              "localProps": {
                "tag": "div",
                "text": "✦ W by Groww",
                "className": "hero-badge"
              }
            },
            {
              "id": "t12_title",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "tag": "h1",
                "text": "Participation ≠ Strategy",
                "className": "hero-title",
                "style": {
                  "textAlign": "center"
                }
              }
            }
          ]
        }
      ]
    },
    {
      "id": "slide_13_groww_what_top_1_doing",
      "title": "What are the top 1% doing right?",
      "slideType": "hero",
      "motionPreset": "luxury",
      "background": {
        "type": "gradient",
        "value": "radial-gradient(ellipse 55% 50% at 85% 85%, rgba(201,168,76,0.05) 0%, #05080F 65%)",
        "opacity": 1,
        "blur": 0,
        "overlayTint": "#d4af37",
        "overlayOpacity": 0.05,
        "focalPointX": 50,
        "focalPointY": 50,
        "cropMode": "cover"
      },
      "components": [
        {
          "id": "t13_stack",
          "type": "stack",
          "layout": {
            "width": "fill",
            "height": "fill",
            "direction": "column",
            "justifyContent": "center",
            "alignItems": "start",
            "gap": "3cqmin",
            "padding": "8cqmin"
          },
          "dataBindings": {},
          "children": [
            {
              "id": "t13_badge",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fit",
                "height": "fit"
              },
              "localProps": {
                "tag": "div",
                "text": "✦ Elite Insights",
                "className": "hero-badge"
              }
            },
            {
              "id": "t13_title",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "tag": "h1",
                "text": "What are the top 1%<br/>doing right?",
                "className": "hero-title"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "slide_14_groww_asset_allocation_beginning",
      "title": "Asset Allocation Beginning",
      "slideType": "hero",
      "motionPreset": "luxury",
      "background": {
        "type": "gradient",
        "value": "radial-gradient(ellipse 55% 50% at 15% 15%, rgba(201,168,76,0.04) 0%, #05080F 65%)",
        "opacity": 1,
        "blur": 0,
        "overlayTint": "#d4af37",
        "overlayOpacity": 0.05,
        "focalPointX": 50,
        "focalPointY": 50,
        "cropMode": "cover"
      },
      "components": [
        {
          "id": "t14_stack",
          "type": "stack",
          "layout": {
            "width": "fill",
            "height": "fill",
            "direction": "column",
            "justifyContent": "center",
            "alignItems": "start",
            "gap": "3cqmin",
            "padding": "8cqmin"
          },
          "dataBindings": {},
          "children": [
            {
              "id": "t14_badge",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fit",
                "height": "fit"
              },
              "localProps": {
                "tag": "div",
                "text": "✦ Strategy Discipline",
                "className": "hero-badge"
              }
            },
            {
              "id": "t14_title",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "tag": "h1",
                "text": "Asset allocation is just the beginning for India's top UHNIs",
                "className": "hero-title"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "slide_15_groww_money_made_intentional",
      "title": "Intentional Allocation",
      "slideType": "hero",
      "motionPreset": "luxury",
      "background": {
        "type": "gradient",
        "value": "radial-gradient(ellipse 55% 50% at 85% 15%, rgba(201,168,76,0.04) 0%, #05080F 65%)",
        "opacity": 1,
        "blur": 0,
        "overlayTint": "#d4af37",
        "overlayOpacity": 0.05,
        "focalPointX": 50,
        "focalPointY": 50,
        "cropMode": "cover"
      },
      "components": [
        {
          "id": "t15_stack",
          "type": "stack",
          "layout": {
            "width": "fill",
            "height": "fill",
            "direction": "column",
            "justifyContent": "center",
            "alignItems": "start",
            "gap": "3cqmin",
            "padding": "8cqmin"
          },
          "dataBindings": {},
          "children": [
            {
              "id": "t15_badge",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fit",
                "height": "fit"
              },
              "localProps": {
                "tag": "div",
                "text": "✦ Allocation Precision",
                "className": "hero-badge"
              }
            },
            {
              "id": "t15_title",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "tag": "h1",
                "text": "Money is made when every allocation is intentional",
                "className": "hero-title"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "slide_16_groww_elite_invest",
      "title": "How Elite Invests",
      "slideType": "chart",
      "motionPreset": "premium",
      "background": {
        "type": "color",
        "value": "#05080F",
        "opacity": 1,
        "blur": 0,
        "overlayTint": "#05080F",
        "overlayOpacity": 0,
        "focalPointX": 50,
        "focalPointY": 50,
        "cropMode": "cover"
      },
      "components": [
        {
          "id": "elite_stack",
          "type": "stack",
          "layout": {
            "width": "fill",
            "height": "fill",
            "direction": "column",
            "justifyContent": "between",
            "gap": "2cqmin",
            "padding": "4cqmin"
          },
          "dataBindings": {},
          "children": [
            {
              "id": "elite_title",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "tag": "h2",
                "text": "How does the Indian Elite invest? A step forward.",
                "className": "slide-heading"
              }
            },
            {
              "id": "elite_cols",
              "type": "columns",
              "layout": {
                "width": "fill",
                "height": "fill",
                "gap": "2cqmin"
              },
              "dataBindings": {},
              "localProps": {
                "widths": [
                  "31%",
                  "38%",
                  "31%"
                ]
              },
              "children": [
                {
                  "id": "elite_col1_stack",
                  "type": "stack",
                  "layout": {
                    "width": "fill",
                    "height": "fill",
                    "direction": "column",
                    "gap": "1.5cqmin",
                    "justifyContent": "around",
                    "padding": "2cqmin"
                  },
                  "dataBindings": {},
                  "localProps": {
                    "style": {
                      "background": "rgba(201,168,76,0.03)",
                      "border": "1px solid rgba(201,168,76,0.08)",
                      "borderRadius": "12px"
                    }
                  },
                  "children": [
                    {
                      "id": "donut_equity_split",
                      "type": "donut-chart",
                      "dataBindings": {},
                      "layout": {
                        "width": "fill",
                        "height": "fit"
                      },
                      "localProps": {
                        "data": [
                          {
                            "label": "Stocks (Listed & unlisted)",
                            "value": 55,
                            "color": "#C9A84C"
                          },
                          {
                            "label": "Mutual funds",
                            "value": 24,
                            "color": "#A0A0A0"
                          },
                          {
                            "label": "PMS",
                            "value": 15,
                            "color": "#606060"
                          },
                          {
                            "label": "ETFs",
                            "value": 2,
                            "color": "#404040"
                          },
                          {
                            "label": "ULIP/Insurance",
                            "value": 4,
                            "color": "#252525"
                          }
                        ],
                        "showLegend": true,
                        "stagger": 6.5
                      }
                    },
                    {
                      "id": "donut_debt_split",
                      "type": "donut-chart",
                      "dataBindings": {},
                      "layout": {
                        "width": "fill",
                        "height": "fit"
                      },
                      "localProps": {
                        "data": [
                          {
                            "label": "Fixed deposits",
                            "value": 35,
                            "color": "#C9A84C"
                          },
                          {
                            "label": "Direct bonds",
                            "value": 30,
                            "color": "#A0A0A0"
                          },
                          {
                            "label": "Mutual funds",
                            "value": 19,
                            "color": "#606060"
                          },
                          {
                            "label": "Others",
                            "value": 16,
                            "color": "#252525"
                          }
                        ],
                        "showLegend": true,
                        "stagger": 7.5
                      }
                    }
                  ]
                },
                {
                  "id": "elite_col2_columns",
                  "type": "columns",
                  "layout": {
                    "width": "fill",
                    "height": "fill",
                    "gap": "1.2cqmin"
                  },
                  "localProps": {
                    "widths": [
                      "50%",
                      "50%"
                    ]
                  },
                  "dataBindings": {},
                  "children": [
                    {
                      "id": "elite_col2_left",
                      "type": "stack",
                      "layout": {
                        "width": "fill",
                        "height": "fill",
                        "direction": "column",
                        "gap": "1.2cqmin"
                      },
                      "dataBindings": {},
                      "children": [
                        {
                          "id": "tree_equity",
                          "type": "headline",
                          "dataBindings": {},
                          "layout": {
                            "width": "fill",
                            "height": "fill"
                          },
                          "localProps": {
                            "tag": "div",
                            "text": "Equity (32%)",
                            "style": {
                              "background": "linear-gradient(135deg, #ECC45C, #C9A84C)",
                              "color": "#FFFFFF",
                              "fontWeight": 700,
                              "fontSize": "1.25cqmin",
                              "display": "flex",
                              "alignItems": "flex-end",
                              "justifyContent": "flex-start",
                              "padding": "1.2cqmin 1.5cqmin",
                              "borderRadius": "12px",
                              "boxShadow": "0 4px 20px rgba(201,168,76,0.12)",
                              "flex": "1.3",
                              "boxSizing": "border-box"
                            }
                          }
                        },
                        {
                          "id": "tree_debt",
                          "type": "headline",
                          "dataBindings": {},
                          "layout": {
                            "width": "fill",
                            "height": "fill"
                          },
                          "localProps": {
                            "tag": "div",
                            "text": "Debt (21%)",
                            "style": {
                              "background": "linear-gradient(135deg, #A8A8A8, #7D7D7D)",
                              "color": "#FFFFFF",
                              "fontWeight": 700,
                              "fontSize": "1.25cqmin",
                              "display": "flex",
                              "alignItems": "flex-end",
                              "justifyContent": "flex-start",
                              "padding": "1.2cqmin 1.5cqmin",
                              "borderRadius": "12px",
                              "boxShadow": "0 4px 20px rgba(255,255,255,0.02)",
                              "flex": "1.0",
                              "boxSizing": "border-box"
                            }
                          }
                        }
                      ]
                    },
                    {
                      "id": "elite_col2_right",
                      "type": "stack",
                      "layout": {
                        "width": "fill",
                        "height": "fill",
                        "direction": "column",
                        "gap": "1.2cqmin"
                      },
                      "dataBindings": {},
                      "children": [
                        {
                          "id": "tree_re",
                          "type": "headline",
                          "dataBindings": {},
                          "layout": {
                            "width": "fill",
                            "height": "fill"
                          },
                          "localProps": {
                            "tag": "div",
                            "text": "Real estate (29%)",
                            "style": {
                              "background": "linear-gradient(135deg, #FFFFFF, #EAEAEA)",
                              "color": "#111827",
                              "fontWeight": 700,
                              "fontSize": "1.25cqmin",
                              "display": "flex",
                              "alignItems": "flex-end",
                              "justifyContent": "flex-start",
                              "padding": "1.2cqmin 1.5cqmin",
                              "borderRadius": "12px",
                              "boxShadow": "0 4px 20px rgba(255,255,255,0.05)",
                              "flex": "1.3",
                              "boxSizing": "border-box"
                            }
                          }
                        },
                        {
                          "id": "tree_alt",
                          "type": "headline",
                          "dataBindings": {},
                          "layout": {
                            "width": "fill",
                            "height": "fill"
                          },
                          "localProps": {
                            "tag": "div",
                            "text": "Alternate assets (18%)",
                            "style": {
                              "background": "linear-gradient(135deg, #4B5563, #1F2937)",
                              "color": "#FFFFFF",
                              "fontWeight": 700,
                              "fontSize": "1.25cqmin",
                              "display": "flex",
                              "alignItems": "flex-end",
                              "justifyContent": "flex-start",
                              "padding": "1.2cqmin 1.5cqmin",
                              "borderRadius": "12px",
                              "boxShadow": "0 4px 20px rgba(0,0,0,0.15)",
                              "flex": "1.0",
                              "boxSizing": "border-box"
                            }
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": "elite_col3_stack",
                  "type": "stack",
                  "layout": {
                    "width": "fill",
                    "height": "fill",
                    "direction": "column",
                    "gap": "1.5cqmin",
                    "justifyContent": "around",
                    "padding": "2cqmin"
                  },
                  "dataBindings": {},
                  "localProps": {
                    "style": {
                      "background": "rgba(201,168,76,0.03)",
                      "border": "1px solid rgba(201,168,76,0.08)",
                      "borderRadius": "12px"
                    }
                  },
                  "children": [
                    {
                      "id": "donut_re_split",
                      "type": "donut-chart",
                      "dataBindings": {},
                      "layout": {
                        "width": "fill",
                        "height": "fit"
                      },
                      "localProps": {
                        "data": [
                          {
                            "label": "Commercial/REITs",
                            "value": 52,
                            "color": "#C9A84C"
                          },
                          {
                            "label": "Residential",
                            "value": 34,
                            "color": "#A0A0A0"
                          },
                          {
                            "label": "GIFT City",
                            "value": 2,
                            "color": "#606060"
                          },
                          {
                            "label": "Not Stated",
                            "value": 12,
                            "color": "#252525"
                          }
                        ],
                        "showLegend": true,
                        "stagger": 6.5
                      }
                    },
                    {
                      "id": "donut_alt_split",
                      "type": "donut-chart",
                      "dataBindings": {},
                      "layout": {
                        "width": "fill",
                        "height": "fit"
                      },
                      "localProps": {
                        "data": [
                          {
                            "label": "PE/VC/Hedge funds",
                            "value": 49,
                            "color": "#C9A84C"
                          },
                          {
                            "label": "Bullion (Gold/Silver)",
                            "value": 31,
                            "color": "#A0A0A0"
                          },
                          {
                            "label": "Others",
                            "value": 7,
                            "color": "#606060"
                          },
                          {
                            "label": "Unstated",
                            "value": 13,
                            "color": "#252525"
                          }
                        ],
                        "showLegend": true,
                        "stagger": 7.5
                      }
                    }
                  ]
                }
              ]
            },
            {
              "id": "elite_footer",
              "type": "paragraph",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "text": "(Source: Top of the Pyramid report, EY)",
                "className": "slide-paragraph"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "slide_17_groww_scatter_plot",
      "title": "Wealth Alpha-Pools Access",
      "slideType": "chart",
      "motionPreset": "premium",
      "background": {
        "type": "color",
        "value": "#05080F",
        "opacity": 1,
        "blur": 0,
        "overlayTint": "#05080F",
        "overlayOpacity": 0,
        "focalPointX": 50,
        "focalPointY": 50,
        "cropMode": "cover"
      },
      "components": [
        {
          "id": "scatter_stack",
          "type": "stack",
          "layout": {
            "width": "fill",
            "height": "fill",
            "direction": "column",
            "justifyContent": "between",
            "gap": "2cqmin",
            "padding": "5cqmin"
          },
          "dataBindings": {},
          "children": [
            {
              "id": "scatter_title",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "tag": "h2",
                "text": "Increasing wealth offers the opportunity to unlock access to alpha-pools which were otherwise restricted",
                "className": "slide-heading"
              }
            },
            {
              "id": "scatter_chart_comp",
              "type": "scatter-plot",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fill"
              },
              "localProps": {
                "points": [
                  {
                    "label": "Mutual funds",
                    "x": 15,
                    "y": 15,
                    "color": "#007BFF"
                  },
                  {
                    "label": "Stocks",
                    "x": 30,
                    "y": 30,
                    "color": "#007BFF"
                  },
                  {
                    "label": "Bonds",
                    "x": 42,
                    "y": 45,
                    "color": "#E07A5F"
                  },
                  {
                    "label": "PMS",
                    "x": 55,
                    "y": 60,
                    "color": "#C9A84C"
                  },
                  {
                    "label": "AIF (Hedged equity, Real estate, Global)",
                    "x": 68,
                    "y": 75,
                    "color": "#C9A84C"
                  },
                  {
                    "label": "Structured Products, AIF (PE/VC), Co-investments",
                    "x": 82,
                    "y": 90,
                    "color": "#8A8A8A"
                  }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "id": "slide_18_groww_niche_pools_turbocharge",
      "title": "Turbocharge Performance",
      "slideType": "hero",
      "motionPreset": "luxury",
      "background": {
        "type": "gradient",
        "value": "radial-gradient(ellipse 55% 50% at 85% 85%, rgba(201,168,76,0.04) 0%, #05080F 65%)",
        "opacity": 1,
        "blur": 0,
        "overlayTint": "#d4af37",
        "overlayOpacity": 0.05,
        "focalPointX": 50,
        "focalPointY": 50,
        "cropMode": "cover"
      },
      "components": [
        {
          "id": "t18_stack",
          "type": "stack",
          "layout": {
            "width": "fill",
            "height": "fill",
            "direction": "column",
            "justifyContent": "center",
            "alignItems": "start",
            "gap": "3cqmin",
            "padding": "8cqmin"
          },
          "dataBindings": {},
          "children": [
            {
              "id": "t18_badge",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fit",
                "height": "fit"
              },
              "localProps": {
                "tag": "div",
                "text": "✦ Alpha Unleashed",
                "className": "hero-badge"
              }
            },
            {
              "id": "t18_title",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "tag": "h1",
                "text": "Access to niche alpha pools turbocharge portfolio performance",
                "className": "hero-title"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "slide_19_groww_but_evidence",
      "title": "Evidence Divider",
      "slideType": "hero",
      "motionPreset": "luxury",
      "background": {
        "type": "gradient",
        "value": "radial-gradient(ellipse 55% 50% at 15% 85%, rgba(201,168,76,0.05) 0%, #05080F 65%)",
        "opacity": 1,
        "blur": 0,
        "overlayTint": "#d4af37",
        "overlayOpacity": 0.05,
        "focalPointX": 50,
        "focalPointY": 50,
        "cropMode": "cover"
      },
      "components": [
        {
          "id": "t19_stack",
          "type": "stack",
          "layout": {
            "width": "fill",
            "height": "fill",
            "direction": "column",
            "justifyContent": "center",
            "alignItems": "start",
            "gap": "3cqmin",
            "padding": "8cqmin"
          },
          "dataBindings": {},
          "children": [
            {
              "id": "t19_badge",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fit",
                "height": "fit"
              },
              "localProps": {
                "tag": "div",
                "text": "✦ Alpha Verification",
                "className": "hero-badge"
              }
            },
            {
              "id": "t19_title",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "tag": "h1",
                "text": "But, evidence?",
                "className": "hero-title"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "slide_20_groww_private_equity_irr_moic",
      "title": "PE IRR vs MOIC across AIF",
      "slideType": "chart",
      "motionPreset": "premium",
      "background": {
        "type": "color",
        "value": "#05080F",
        "opacity": 1,
        "blur": 0,
        "overlayTint": "#05080F",
        "overlayOpacity": 0,
        "focalPointX": 50,
        "focalPointY": 50,
        "cropMode": "cover"
      },
      "components": [
        {
          "id": "pe_irr_stack",
          "type": "stack",
          "layout": {
            "width": "fill",
            "height": "fill",
            "direction": "column",
            "justifyContent": "between",
            "gap": "3cqmin",
            "padding": "5cqmin"
          },
          "dataBindings": {},
          "children": [
            {
              "id": "pe_heading",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "tag": "h2",
                "text": "IRR of private equity investment across AIF series",
                "className": "slide-heading"
              }
            },
            {
              "id": "pe_charts_cols",
              "type": "columns",
              "layout": {
                "width": "fill",
                "height": "fill",
                "gap": "2cqmin",
                "alignItems": "center"
              },
              "dataBindings": {},
              "localProps": {
                "widths": [
                  "46%",
                  "8%",
                  "46%"
                ]
              },
              "children": [
                {
                  "id": "irr_vertical_chart",
                  "type": "bar-chart",
                  "dataBindings": {},
                  "layout": {
                    "width": "fill",
                    "height": "fill"
                  },
                  "localProps": {
                    "data": [
                      {
                        "label": "Series I",
                        "value": 26.8,
                        "highlight": false
                      },
                      {
                        "label": "Series II",
                        "value": 18,
                        "highlight": false
                      },
                      {
                        "label": "Series III",
                        "value": 27.5,
                        "highlight": false
                      },
                      {
                        "label": "Series IV",
                        "value": 27.7,
                        "highlight": true
                      }
                    ],
                    "unit": "%",
                    "maxValue": 35,
                    "layoutType": "vertical"
                  }
                },
                {
                  "id": "moic_connector",
                  "type": "headline",
                  "dataBindings": {},
                  "layout": {
                    "width": "fill",
                    "height": "fit"
                  },
                  "localProps": {
                    "tag": "div",
                    "text": "➔",
                    "style": {
                      "fontSize": "36px",
                      "color": "var(--gold)",
                      "textAlign": "center",
                      "fontWeight": "bold"
                    }
                  }
                },
                {
                  "id": "moic_vertical_chart",
                  "type": "bar-chart",
                  "dataBindings": {},
                  "layout": {
                    "width": "fill",
                    "height": "fill"
                  },
                  "localProps": {
                    "data": [
                      {
                        "label": "Fund I (Fully Exited)",
                        "value": 6,
                        "highlight": true
                      },
                      {
                        "label": "Fund II (Partial Exit)",
                        "value": 4,
                        "highlight": false
                      },
                      {
                        "label": "Fund III (Ongoing)",
                        "value": 3.7,
                        "highlight": false
                      },
                      {
                        "label": "Fund IV (Ongoing)",
                        "value": 1.5,
                        "highlight": false
                      }
                    ],
                    "unit": "x",
                    "maxValue": 8,
                    "layoutType": "vertical"
                  }
                }
              ]
            },
            {
              "id": "pe_footer",
              "type": "paragraph",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "text": "(Source: AMC Disclosures, W Research) | *Series I completely exited in FY22 | Right Chart: Gross MOIC",
                "className": "slide-paragraph"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "slide_21_groww_smallcap_pms_mf_index",
      "title": "Smallcap PMS vs MF vs Index",
      "slideType": "chart",
      "motionPreset": "premium",
      "background": {
        "type": "color",
        "value": "#05080F",
        "opacity": 1,
        "blur": 0,
        "overlayTint": "#05080F",
        "overlayOpacity": 0,
        "focalPointX": 50,
        "focalPointY": 50,
        "cropMode": "cover"
      },
      "components": [
        {
          "id": "sc_pms_stack",
          "type": "stack",
          "layout": {
            "width": "fill",
            "height": "fill",
            "direction": "column",
            "justifyContent": "between",
            "gap": "3cqmin",
            "padding": "5cqmin"
          },
          "dataBindings": {},
          "children": [
            {
              "id": "sc_pms_title",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "tag": "h2",
                "text": "Case-in-point: Smallcap PMS vs Smallcap MF vs Smallcap Index",
                "className": "slide-heading"
              }
            },
            {
              "id": "sc_pms_cols",
              "type": "columns",
              "layout": {
                "width": "fill",
                "height": "fill",
                "gap": "2cqmin",
                "alignItems": "center"
              },
              "dataBindings": {},
              "localProps": {
                "widths": [
                  "46%",
                  "8%",
                  "46%"
                ]
              },
              "children": [
                {
                  "id": "sc_pms_perf_chart",
                  "type": "bar-chart",
                  "dataBindings": {},
                  "layout": {
                    "width": "fill",
                    "height": "fill"
                  },
                  "localProps": {
                    "data": [
                      {
                        "label": "1Yr Returns (PMS)",
                        "value": 62,
                        "highlight": true
                      },
                      {
                        "label": "1Yr Returns (MF)",
                        "value": 3,
                        "highlight": false
                      },
                      {
                        "label": "3Yr Returns (PMS)",
                        "value": 53,
                        "highlight": true
                      },
                      {
                        "label": "3Yr Returns (MF)",
                        "value": 31,
                        "highlight": false
                      },
                      {
                        "label": "3Yr Returns (Nifty Small)",
                        "value": 20,
                        "highlight": false
                      }
                    ],
                    "unit": "%",
                    "maxValue": 70,
                    "layoutType": "vertical"
                  }
                },
                {
                  "id": "sc_pms_connector",
                  "type": "headline",
                  "dataBindings": {},
                  "layout": {
                    "width": "fill",
                    "height": "fit"
                  },
                  "localProps": {
                    "tag": "div",
                    "text": "➔",
                    "style": {
                      "fontSize": "36px",
                      "color": "var(--gold)",
                      "textAlign": "center",
                      "fontWeight": "bold"
                    }
                  }
                },
                {
                  "id": "sc_pms_5y_chart",
                  "type": "bar-chart",
                  "dataBindings": {},
                  "layout": {
                    "width": "fill",
                    "height": "fill"
                  },
                  "localProps": {
                    "data": [
                      {
                        "label": "Small-cap PMS (Select)",
                        "value": 82.5,
                        "highlight": true
                      },
                      {
                        "label": "Top Smallcap MF",
                        "value": 39.2,
                        "highlight": false
                      },
                      {
                        "label": "NIFTY Smallcap 250",
                        "value": 25,
                        "highlight": false
                      }
                    ],
                    "unit": "L",
                    "maxValue": 90,
                    "layoutType": "vertical"
                  }
                }
              ]
            },
            {
              "id": "sc_pms_footer",
              "type": "paragraph",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "text": "Left Chart: Periodic Performance (CAGR) | Right Chart: Current value of ₹10L invested 5Y ago | Source: AMC Disclosures, W Research. Data as of January 2026",
                "className": "slide-paragraph"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "slide_22_groww_private_credit",
      "title": "Private Credit AIF IRR",
      "slideType": "chart",
      "motionPreset": "executive",
      "background": {
        "type": "color",
        "value": "#05080F",
        "opacity": 1,
        "blur": 0,
        "overlayTint": "#05080F",
        "overlayOpacity": 0,
        "focalPointX": 50,
        "focalPointY": 50,
        "cropMode": "cover"
      },
      "components": [
        {
          "id": "pc_stack",
          "type": "stack",
          "layout": {
            "width": "fill",
            "height": "fill",
            "direction": "column",
            "justifyContent": "between",
            "gap": "3cqmin",
            "padding": "5cqmin"
          },
          "dataBindings": {},
          "children": [
            {
              "id": "pc_title",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "tag": "h2",
                "text": "Case-in-point: Private Credit Fund; Delivered IRR",
                "className": "slide-heading"
              }
            },
            {
              "id": "pc_chart",
              "type": "bar-chart",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fill"
              },
              "localProps": {
                "data": [
                  {
                    "label": "Series 1",
                    "value": 15.5,
                    "highlight": true
                  },
                  {
                    "label": "Series 2",
                    "value": 12.4,
                    "highlight": false
                  },
                  {
                    "label": "Series 3 (Ongoing)",
                    "value": 11.5,
                    "highlight": false
                  }
                ],
                "unit": "%",
                "maxValue": 20,
                "layoutType": "vertical"
              }
            },
            {
              "id": "pc_footer",
              "type": "paragraph",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "text": "(Source: AMC Disclosures, W Research | Select Private Credit AIF)",
                "className": "slide-paragraph"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "slide_23_groww_alpha_smart_strategy",
      "title": "Smart Strategy Alpha",
      "slideType": "hero",
      "motionPreset": "luxury",
      "background": {
        "type": "gradient",
        "value": "radial-gradient(ellipse 55% 50% at 85% 15%, rgba(201,168,76,0.04) 0%, #05080F 65%)",
        "opacity": 1,
        "blur": 0,
        "overlayTint": "#d4af37",
        "overlayOpacity": 0.05,
        "focalPointX": 50,
        "focalPointY": 50,
        "cropMode": "cover"
      },
      "components": [
        {
          "id": "t23_stack",
          "type": "stack",
          "layout": {
            "width": "fill",
            "height": "fill",
            "direction": "column",
            "justifyContent": "center",
            "alignItems": "start",
            "gap": "3cqmin",
            "padding": "8cqmin"
          },
          "dataBindings": {},
          "children": [
            {
              "id": "t23_badge",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fit",
                "height": "fit"
              },
              "localProps": {
                "tag": "div",
                "text": "✦ Active Strategy",
                "className": "hero-badge"
              }
            },
            {
              "id": "t23_title",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "tag": "h1",
                "text": "Alpha is not in every exotic product;<br/>But it sure is present in every smart strategy",
                "className": "hero-title"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "slide_24_groww_wealthedge_FoF",
      "title": "WealthEdge by W Divider",
      "slideType": "hero",
      "motionPreset": "luxury",
      "background": {
        "type": "gradient",
        "value": "radial-gradient(ellipse 55% 50% at 15% 15%, rgba(201,168,76,0.05) 0%, #05080F 65%)",
        "opacity": 1,
        "blur": 0,
        "overlayTint": "#d4af37",
        "overlayOpacity": 0.05,
        "focalPointX": 50,
        "focalPointY": 50,
        "cropMode": "cover"
      },
      "components": [
        {
          "id": "t24_stack",
          "type": "stack",
          "layout": {
            "width": "fill",
            "height": "fill",
            "direction": "column",
            "justifyContent": "center",
            "alignItems": "center",
            "gap": "2cqmin",
            "padding": "8cqmin"
          },
          "dataBindings": {},
          "children": [
            {
              "id": "t24_badge",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fit",
                "height": "fit"
              },
              "localProps": {
                "tag": "div",
                "text": "✦ Case-in-point",
                "className": "hero-badge"
              }
            },
            {
              "id": "t24_title",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "tag": "h1",
                "text": "WealthEdge by W",
                "className": "hero-title",
                "style": {
                  "color": "var(--gold-l)",
                  "textAlign": "center",
                  "fontStyle": "italic"
                }
              }
            },
            {
              "id": "t24_sub",
              "type": "paragraph",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "text": "A truly flexicap, actively managed FoF strategy",
                "className": "hero-subtitle",
                "style": {
                  "textAlign": "center"
                }
              }
            }
          ]
        }
      ]
    },
    {
      "id": "slide_25_groww_performance_scorecard",
      "title": "Performance Scorecard",
      "slideType": "chart",
      "motionPreset": "premium",
      "background": {
        "type": "color",
        "value": "#05080F",
        "opacity": 1,
        "blur": 0,
        "overlayTint": "#05080F",
        "overlayOpacity": 0,
        "focalPointX": 50,
        "focalPointY": 50,
        "cropMode": "cover"
      },
      "components": [
        {
          "id": "scorecard_stack",
          "type": "stack",
          "layout": {
            "width": "fill",
            "height": "fill",
            "direction": "column",
            "justifyContent": "between",
            "gap": "2cqmin",
            "padding": "5cqmin"
          },
          "dataBindings": {},
          "children": [
            {
              "id": "scorecard_header",
              "type": "stack",
              "layout": {
                "width": "fill",
                "height": "fit",
                "direction": "column",
                "gap": "0.5cqmin"
              },
              "dataBindings": {},
              "children": [
                {
                  "id": "scorecard_title",
                  "type": "headline",
                  "dataBindings": {},
                  "layout": {
                    "width": "fill",
                    "height": "fit"
                  },
                  "localProps": {
                    "tag": "h2",
                    "text": "Straightforward product + Sophisticated strategy",
                    "className": "slide-heading"
                  }
                },
                {
                  "id": "scorecard_subtitle",
                  "type": "paragraph",
                  "dataBindings": {},
                  "layout": {
                    "width": "fill",
                    "height": "fit"
                  },
                  "localProps": {
                    "text": "Risk-adjusted, consistent, sustainable alpha | Performance Scorecard",
                    "className": "slide-paragraph"
                  }
                }
              ]
            },
            {
              "id": "scorecard_chart_container",
              "type": "stack",
              "layout": {
                "width": "fill",
                "height": "fill",
                "direction": "column",
                "gap": "1cqmin",
                "alignItems": "center"
              },
              "dataBindings": {},
              "children": [
                {
                  "id": "scorecard_pill",
                  "type": "headline",
                  "dataBindings": {},
                  "layout": {
                    "width": "fit",
                    "height": "fit"
                  },
                  "localProps": {
                    "tag": "div",
                    "text": "Performance as of April 2026 (%)",
                    "className": "bse-chart-header-pill"
                  }
                },
                {
                  "id": "scorecard_grouped_chart",
                  "type": "grouped-bar-chart",
                  "dataBindings": {},
                  "layout": {
                    "width": "fill",
                    "height": "fill"
                  },
                  "localProps": {
                    "groups": [
                      {
                        "label": "6M",
                        "values": [
                          3.3,
                          -4.3
                        ],
                        "alpha": "+7.6% Alpha"
                      },
                      {
                        "label": "1Y",
                        "values": [
                          15.5,
                          3.6
                        ],
                        "alpha": "+11.9% Alpha"
                      },
                      {
                        "label": "Since Inception (20 Dec, '24)",
                        "values": [
                          9.1,
                          0.5
                        ],
                        "alpha": "+8.6% Alpha"
                      }
                    ],
                    "maxValue": 20,
                    "unit": "%"
                  }
                }
              ]
            },
            {
              "id": "scorecard_footer",
              "type": "paragraph",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "text": "(Source: SEBI | Data as of 30th April 2026. Returns are TWRR | PMS inception date: 20 December 2024.)",
                "className": "slide-paragraph"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "slide_26_groww_monthly_performance",
      "title": "Monthly Performance Scorecard",
      "slideType": "chart",
      "motionPreset": "premium",
      "background": {
        "type": "color",
        "value": "#05080F",
        "opacity": 1,
        "blur": 0,
        "overlayTint": "#05080F",
        "overlayOpacity": 0,
        "focalPointX": 50,
        "focalPointY": 50,
        "cropMode": "cover"
      },
      "components": [
        {
          "id": "monthly_stack",
          "type": "stack",
          "layout": {
            "width": "fill",
            "height": "fill",
            "direction": "column",
            "justifyContent": "between",
            "gap": "2cqmin",
            "padding": "5cqmin"
          },
          "dataBindings": {},
          "children": [
            {
              "id": "monthly_header",
              "type": "stack",
              "layout": {
                "width": "fill",
                "height": "fit",
                "direction": "column",
                "gap": "0.5cqmin"
              },
              "dataBindings": {},
              "children": [
                {
                  "id": "monthly_title",
                  "type": "headline",
                  "dataBindings": {},
                  "layout": {
                    "width": "fill",
                    "height": "fit"
                  },
                  "localProps": {
                    "tag": "h2",
                    "text": "The portfolio is engineered for optimising risk-adjusted performance across cycles",
                    "className": "slide-heading"
                  }
                },
                {
                  "id": "monthly_sub",
                  "type": "paragraph",
                  "dataBindings": {},
                  "layout": {
                    "width": "fill",
                    "height": "fit"
                  },
                  "localProps": {
                    "text": "The investment process is time-tested and has held up across market cycles",
                    "className": "slide-paragraph"
                  }
                }
              ]
            },
            {
              "id": "monthly_chart_container",
              "type": "stack",
              "layout": {
                "width": "fill",
                "height": "fill",
                "direction": "column",
                "gap": "1cqmin",
                "alignItems": "center"
              },
              "dataBindings": {},
              "children": [
                {
                  "id": "monthly_pill",
                  "type": "headline",
                  "dataBindings": {},
                  "layout": {
                    "width": "fit",
                    "height": "fit"
                  },
                  "localProps": {
                    "tag": "div",
                    "text": "Monthly Performance as of April 2026 (%)",
                    "className": "bse-chart-header-pill"
                  }
                },
                {
                  "id": "monthly_grouped_chart",
                  "type": "grouped-bar-chart",
                  "dataBindings": {},
                  "layout": {
                    "width": "fill",
                    "height": "fill"
                  },
                  "localProps": {
                    "groups": [
                      {
                        "label": "May-25",
                        "values": [
                          4,
                          3.3
                        ],
                        "alpha": "+0.7%"
                      },
                      {
                        "label": "Jun-25",
                        "values": [
                          3.8,
                          3.7
                        ],
                        "alpha": "+0.1%"
                      },
                      {
                        "label": "Jul-25",
                        "values": [
                          -2,
                          -2.9
                        ],
                        "alpha": "+0.9%"
                      },
                      {
                        "label": "Aug-25",
                        "values": [
                          -1.5,
                          -2.1
                        ],
                        "alpha": "+0.6%"
                      },
                      {
                        "label": "Sep-25",
                        "values": [
                          3.5,
                          2
                        ],
                        "alpha": "+1.5%"
                      },
                      {
                        "label": "Oct-25",
                        "values": [
                          3.9,
                          4.5
                        ],
                        "alpha": "-0.6%"
                      },
                      {
                        "label": "Nov-25",
                        "values": [
                          2.8,
                          1.8
                        ],
                        "alpha": "+1.0%"
                      },
                      {
                        "label": "Dec-25",
                        "values": [
                          3.2,
                          0.5
                        ],
                        "alpha": "+2.7%"
                      },
                      {
                        "label": "Jan-26",
                        "values": [
                          1.9,
                          -4
                        ],
                        "alpha": "+5.9%"
                      },
                      {
                        "label": "Feb-26",
                        "values": [
                          -1,
                          0.9
                        ],
                        "alpha": "-1.9%"
                      },
                      {
                        "label": "Mar-26",
                        "values": [
                          -7.5,
                          -8.9
                        ],
                        "alpha": "+1.4%"
                      },
                      {
                        "label": "Apr-26",
                        "values": [
                          6,
                          7.6
                        ],
                        "alpha": "-1.6%"
                      }
                    ],
                    "maxValue": 10,
                    "unit": "%"
                  }
                }
              ]
            },
            {
              "id": "monthly_footer",
              "type": "paragraph",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "text": "(Data as of 30th April 2026 | Performance computation basis APMI WealthEdge PMS inception date: 20 December 2024.)",
                "className": "slide-paragraph"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "slide_27_groww_participation_strategy_2",
      "title": "Participation vs Strategy",
      "slideType": "hero",
      "motionPreset": "luxury",
      "background": {
        "type": "gradient",
        "value": "radial-gradient(ellipse 55% 50% at 85% 85%, rgba(201,168,76,0.05) 0%, #05080F 65%)",
        "opacity": 1,
        "blur": 0,
        "overlayTint": "#d4af37",
        "overlayOpacity": 0.05,
        "focalPointX": 50,
        "focalPointY": 50,
        "cropMode": "cover"
      },
      "components": [
        {
          "id": "t27_stack",
          "type": "stack",
          "layout": {
            "width": "fill",
            "height": "fill",
            "direction": "column",
            "justifyContent": "center",
            "alignItems": "center",
            "gap": "3cqmin",
            "padding": "8cqmin"
          },
          "dataBindings": {},
          "children": [
            {
              "id": "t27_badge",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fit",
                "height": "fit"
              },
              "localProps": {
                "tag": "div",
                "text": "✦ W by Groww",
                "className": "hero-badge"
              }
            },
            {
              "id": "t27_title",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "tag": "h1",
                "text": "Participation ≠ Strategy",
                "className": "hero-title",
                "style": {
                  "textAlign": "center"
                }
              }
            }
          ]
        }
      ]
    },
    {
      "id": "slide_28_groww_alpha_generating_universe",
      "title": "Alpha Generating Universe",
      "slideType": "hero",
      "motionPreset": "luxury",
      "background": {
        "type": "gradient",
        "value": "radial-gradient(ellipse 55% 50% at 15% 85%, rgba(201,168,76,0.04) 0%, #05080F 65%)",
        "opacity": 1,
        "blur": 0,
        "overlayTint": "#d4af37",
        "overlayOpacity": 0.05,
        "focalPointX": 50,
        "focalPointY": 50,
        "cropMode": "cover"
      },
      "components": [
        {
          "id": "t28_stack",
          "type": "stack",
          "layout": {
            "width": "fill",
            "height": "fill",
            "direction": "column",
            "justifyContent": "center",
            "alignItems": "start",
            "gap": "3cqmin",
            "padding": "8cqmin"
          },
          "dataBindings": {},
          "children": [
            {
              "id": "t28_badge",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fit",
                "height": "fit"
              },
              "localProps": {
                "tag": "div",
                "text": "✦ Alpha Boundaries",
                "className": "hero-badge"
              }
            },
            {
              "id": "t28_title",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "tag": "h1",
                "text": "Alpha generating universe ≠<br/>Known universe",
                "className": "hero-title"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "slide_29_groww_long_term_investing",
      "title": "Long-term Investing Active Control",
      "slideType": "hero",
      "motionPreset": "luxury",
      "background": {
        "type": "gradient",
        "value": "radial-gradient(ellipse 55% 50% at 85% 15%, rgba(201,168,76,0.04) 0%, #05080F 65%)",
        "opacity": 1,
        "blur": 0,
        "overlayTint": "#d4af37",
        "overlayOpacity": 0.05,
        "focalPointX": 50,
        "focalPointY": 50,
        "cropMode": "cover"
      },
      "components": [
        {
          "id": "t29_stack",
          "type": "stack",
          "layout": {
            "width": "fill",
            "height": "fill",
            "direction": "column",
            "justifyContent": "center",
            "alignItems": "start",
            "gap": "3cqmin",
            "padding": "8cqmin"
          },
          "dataBindings": {},
          "children": [
            {
              "id": "t29_badge",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fit",
                "height": "fit"
              },
              "localProps": {
                "tag": "div",
                "text": "✦ Long-term Control",
                "className": "hero-badge"
              }
            },
            {
              "id": "t29_title",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "tag": "h1",
                "text": "Long-term investing ≠<br/>Sleeping at the steering wheel",
                "className": "hero-title"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "slide_30_groww_trinity_philosophy",
      "title": "Alpha Trinity Philosophy",
      "slideType": "hero",
      "motionPreset": "luxury",
      "background": {
        "type": "gradient",
        "value": "linear-gradient(135deg, #000000 0%, #05080F 50%, #000000 100%)",
        "opacity": 1,
        "blur": 0,
        "overlayTint": "#d4af37",
        "overlayOpacity": 0.05,
        "focalPointX": 50,
        "focalPointY": 50,
        "cropMode": "cover"
      },
      "components": [
        {
          "id": "trinity_div_stack",
          "type": "stack",
          "layout": {
            "width": "fill",
            "height": "fill",
            "direction": "column",
            "justifyContent": "center",
            "alignItems": "center",
            "gap": "2cqmin",
            "padding": "8cqmin"
          },
          "dataBindings": {},
          "children": [
            {
              "id": "trinity_badge",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fit",
                "height": "fit"
              },
              "localProps": {
                "tag": "div",
                "text": "✦ W's Investment Philosophy",
                "className": "hero-badge"
              }
            },
            {
              "id": "trinity_title",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "tag": "h1",
                "text": "W's Alpha Trinity Philosophy",
                "className": "hero-title",
                "style": {
                  "textAlign": "center"
                }
              }
            },
            {
              "id": "trinity_sub",
              "type": "paragraph",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit",
                "maxWidth": "70%"
              },
              "localProps": {
                "text": "Three factors influence probability and extent of alpha",
                "className": "hero-subtitle",
                "style": {
                  "textAlign": "center"
                }
              }
            }
          ]
        }
      ]
    },
    {
      "id": "slide_31_groww_trinity_overlap",
      "title": "The Alpha Trinity Venn",
      "slideType": "chart",
      "motionPreset": "premium",
      "background": {
        "type": "color",
        "value": "#05080F",
        "opacity": 1,
        "blur": 0,
        "overlayTint": "#05080F",
        "overlayOpacity": 0,
        "focalPointX": 50,
        "focalPointY": 50,
        "cropMode": "cover"
      },
      "components": [
        {
          "id": "trinity_props_stack",
          "type": "stack",
          "layout": {
            "width": "fill",
            "height": "fill",
            "direction": "column",
            "justifyContent": "between",
            "gap": "2.5cqmin",
            "padding": "5cqmin"
          },
          "dataBindings": {},
          "children": [
            {
              "id": "trinity_props_title",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "tag": "h2",
                "text": "The Alpha trinity: Selection. Allocation. Timing",
                "className": "slide-heading"
              }
            },
            {
              "id": "trinity_venn_cols",
              "type": "columns",
              "layout": {
                "width": "fill",
                "height": "fill",
                "gap": "2cqmin",
                "alignItems": "center"
              },
              "dataBindings": {},
              "localProps": {
                "widths": [
                  "28%",
                  "44%",
                  "28%"
                ]
              },
              "children": [
                {
                  "id": "venn_col_left",
                  "type": "stack",
                  "layout": {
                    "width": "fill",
                    "height": "fit",
                    "direction": "column",
                    "gap": "1cqmin"
                  },
                  "dataBindings": {},
                  "children": [
                    {
                      "id": "pa_propellor",
                      "type": "headline",
                      "dataBindings": {},
                      "layout": {
                        "width": "fill",
                        "height": "fit"
                      },
                      "localProps": {
                        "tag": "div",
                        "text": "Propellor",
                        "style": {
                          "fontSize": "12px",
                          "color": "var(--gold)",
                          "fontStyle": "italic"
                        }
                      }
                    },
                    {
                      "id": "pa_title",
                      "type": "headline",
                      "dataBindings": {},
                      "layout": {
                        "width": "fill",
                        "height": "fit"
                      },
                      "localProps": {
                        "tag": "h3",
                        "text": "Product access",
                        "style": {
                          "fontWeight": 700,
                          "margin": "4px 0"
                        }
                      }
                    },
                    {
                      "id": "pa_desc",
                      "type": "paragraph",
                      "dataBindings": {},
                      "layout": {
                        "width": "fill",
                        "height": "fit"
                      },
                      "localProps": {
                        "text": "Access to alpha-extracting pool of products: PMS, AIF, Structured deals, Bonds, Pre-IPO equity"
                      }
                    }
                  ]
                },
                {
                  "id": "venn_diagram_comp",
                  "type": "venn-diagram",
                  "dataBindings": {},
                  "layout": {
                    "width": "fill",
                    "height": "fill"
                  }
                },
                {
                  "id": "venn_col_right",
                  "type": "stack",
                  "layout": {
                    "width": "fill",
                    "height": "fit",
                    "direction": "column",
                    "gap": "2cqmin"
                  },
                  "dataBindings": {},
                  "children": [
                    {
                      "id": "pa_arch_stack",
                      "type": "stack",
                      "layout": {
                        "width": "fill",
                        "height": "fit",
                        "direction": "column",
                        "gap": "0.5cqmin"
                      },
                      "dataBindings": {},
                      "children": [
                        {
                          "id": "arch_propellor",
                          "type": "headline",
                          "dataBindings": {},
                          "layout": {
                            "width": "fill",
                            "height": "fit"
                          },
                          "localProps": {
                            "tag": "div",
                            "text": "Propellor",
                            "style": {
                              "fontSize": "12px",
                              "color": "var(--gold)",
                              "fontStyle": "italic"
                            }
                          }
                        },
                        {
                          "id": "arch_title",
                          "type": "headline",
                          "dataBindings": {},
                          "layout": {
                            "width": "fill",
                            "height": "fit"
                          },
                          "localProps": {
                            "tag": "h3",
                            "text": "Portfolio architecture",
                            "style": {
                              "fontWeight": 700
                            }
                          }
                        },
                        {
                          "id": "arch_desc",
                          "type": "paragraph",
                          "dataBindings": {},
                          "layout": {
                            "width": "fill",
                            "height": "fit"
                          },
                          "localProps": {
                            "text": "Risk-optimisation, tax efficiency, cost effectiveness, sizing frameworks"
                          }
                        }
                      ]
                    },
                    {
                      "id": "mi_intel_stack",
                      "type": "stack",
                      "layout": {
                        "width": "fill",
                        "height": "fit",
                        "direction": "column",
                        "gap": "0.5cqmin"
                      },
                      "dataBindings": {},
                      "children": [
                        {
                          "id": "mi_propellor",
                          "type": "headline",
                          "dataBindings": {},
                          "layout": {
                            "width": "fill",
                            "height": "fit"
                          },
                          "localProps": {
                            "tag": "div",
                            "text": "Propellor",
                            "style": {
                              "fontSize": "12px",
                              "color": "var(--gold)",
                              "fontStyle": "italic"
                            }
                          }
                        },
                        {
                          "id": "mi_title",
                          "type": "headline",
                          "dataBindings": {},
                          "layout": {
                            "width": "fill",
                            "height": "fit"
                          },
                          "localProps": {
                            "tag": "h3",
                            "text": "Market intelligence",
                            "style": {
                              "fontWeight": 700
                            }
                          }
                        },
                        {
                          "id": "mi_desc",
                          "type": "paragraph",
                          "dataBindings": {},
                          "layout": {
                            "width": "fill",
                            "height": "fit"
                          },
                          "localProps": {
                            "text": "Deep insights into economic, business and market cycles"
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "slide_32_groww_bespoke_winning_portfolio",
      "title": "Bespoke Winning Portfolio",
      "slideType": "hero",
      "motionPreset": "luxury",
      "background": {
        "type": "gradient",
        "value": "radial-gradient(ellipse 55% 50% at 15% 85%, rgba(201,168,76,0.05) 0%, #05080F 65%)",
        "opacity": 1,
        "blur": 0,
        "overlayTint": "#d4af37",
        "overlayOpacity": 0.05,
        "focalPointX": 50,
        "focalPointY": 50,
        "cropMode": "cover"
      },
      "components": [
        {
          "id": "t32_stack",
          "type": "stack",
          "layout": {
            "width": "fill",
            "height": "fill",
            "direction": "column",
            "justifyContent": "center",
            "alignItems": "center",
            "gap": "2cqmin",
            "padding": "8cqmin"
          },
          "dataBindings": {},
          "children": [
            {
              "id": "t32_badge",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fit",
                "height": "fit"
              },
              "localProps": {
                "tag": "div",
                "text": "✦ W's Alpha Trinity",
                "className": "hero-badge"
              }
            },
            {
              "id": "t32_title",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "tag": "h1",
                "text": "W's Alpha Trinity",
                "className": "hero-title",
                "style": {
                  "textAlign": "center",
                  "color": "var(--gold-l)"
                }
              }
            },
            {
              "id": "t32_sub",
              "type": "paragraph",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "text": "Your unique profile + W investment philosophy = Bespoke winning portfolio",
                "className": "hero-subtitle",
                "style": {
                  "textAlign": "center",
                  "fontWeight": "700"
                }
              }
            }
          ]
        }
      ]
    },
    {
      "id": "slide_33_groww_illustrative_portfolios_divider",
      "title": "Illustrative Portfolios Divider",
      "slideType": "hero",
      "motionPreset": "luxury",
      "background": {
        "type": "gradient",
        "value": "radial-gradient(ellipse 55% 50% at 85% 85%, rgba(201,168,76,0.05) 0%, #05080F 65%)",
        "opacity": 1,
        "blur": 0,
        "overlayTint": "#d4af37",
        "overlayOpacity": 0.05,
        "focalPointX": 50,
        "focalPointY": 50,
        "cropMode": "cover"
      },
      "components": [
        {
          "id": "t33_stack",
          "type": "stack",
          "layout": {
            "width": "fill",
            "height": "fill",
            "direction": "column",
            "justifyContent": "center",
            "alignItems": "start",
            "gap": "2cqmin",
            "padding": "8cqmin"
          },
          "dataBindings": {},
          "children": [
            {
              "id": "t33_badge",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fit",
                "height": "fit"
              },
              "localProps": {
                "tag": "div",
                "text": "✦ Model Allocations",
                "className": "hero-badge"
              }
            },
            {
              "id": "t33_title",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "tag": "h1",
                "text": "Illustrative Portfolios",
                "className": "hero-title",
                "style": {
                  "color": "var(--gold-l)"
                }
              }
            },
            {
              "id": "t33_sub",
              "type": "paragraph",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "text": "Aggressive investors seeking to create wealth over 5+ years",
                "className": "hero-subtitle"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "slide_34_groww_illustrative_portfolios_table",
      "title": "Illustrative Portfolios Table",
      "slideType": "chart",
      "motionPreset": "premium",
      "background": {
        "type": "color",
        "value": "#05080F",
        "opacity": 1,
        "blur": 0,
        "overlayTint": "#05080F",
        "overlayOpacity": 0,
        "focalPointX": 50,
        "focalPointY": 50,
        "cropMode": "cover"
      },
      "components": [
        {
          "id": "illustrative_table_stack",
          "type": "stack",
          "layout": {
            "width": "fill",
            "height": "fill",
            "direction": "column",
            "justifyContent": "between",
            "gap": "2cqmin",
            "padding": "4cqmin"
          },
          "dataBindings": {},
          "children": [
            {
              "id": "illustrative_table_title",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fill",
                "height": "fit"
              },
              "localProps": {
                "tag": "h2",
                "text": "Illustrative Portfolios | Aggressive wealth creation over 5+ years",
                "className": "slide-heading"
              }
            },
            {
              "id": "illustrative_table_cols",
              "type": "columns",
              "layout": {
                "width": "fill",
                "height": "fill",
                "gap": "3cqmin"
              },
              "dataBindings": {},
              "localProps": {
                "widths": [
                  "33%",
                  "33%",
                  "33%"
                ]
              },
              "children": [
                {
                  "id": "lucknow_col_stack",
                  "type": "stack",
                  "layout": {
                    "width": "fill",
                    "height": "fill",
                    "direction": "column",
                    "gap": "1.5cqmin",
                    "justifyContent": "between",
                    "padding": "2cqmin"
                  },
                  "dataBindings": {},
                  "localProps": {
                    "style": {
                      "background": "rgba(201,168,76,0.03)",
                      "border": "1px solid rgba(201,168,76,0.08)",
                      "borderRadius": "12px"
                    }
                  },
                  "children": [
                    {
                      "id": "lucknow_title",
                      "type": "headline",
                      "dataBindings": {},
                      "layout": {
                        "width": "fill",
                        "height": "fit"
                      },
                      "localProps": {
                        "tag": "h3",
                        "text": "58 Y/o Retired Bureaucrat,<br/>Lucknow",
                        "style": {
                          "fontSize": "14px",
                          "fontWeight": "700",
                          "textAlign": "center"
                        }
                      }
                    },
                    {
                      "id": "lucknow_donut",
                      "type": "donut-chart",
                      "dataBindings": {},
                      "layout": {
                        "width": "fill",
                        "height": "fit"
                      },
                      "localProps": {
                        "data": [
                          {
                            "label": "Stocks",
                            "value": 40,
                            "color": "#C9A84C"
                          },
                          {
                            "label": "Direct bonds",
                            "value": 40,
                            "color": "#8A8A8A"
                          },
                          {
                            "label": "WealthEdge PMS",
                            "value": 20,
                            "color": "#444444"
                          }
                        ],
                        "showLegend": true
                      }
                    },
                    {
                      "id": "lucknow_irr_box",
                      "type": "headline",
                      "dataBindings": {
                        "text": "lucknowIRR"
                      },
                      "layout": {
                        "width": "fill",
                        "height": "fit",
                        "padding": "0cqmin"
                      },
                      "localProps": {
                        "tag": "div",
                        "className": "bse-chart-header-pill",
                        "style": {
                          "margin": "0 auto",
                          "display": "block"
                        }
                      }
                    }
                  ]
                },
                {
                  "id": "bangalore_col_stack",
                  "type": "stack",
                  "layout": {
                    "width": "fill",
                    "height": "fill",
                    "direction": "column",
                    "gap": "1.5cqmin",
                    "justifyContent": "between",
                    "padding": "2cqmin"
                  },
                  "dataBindings": {},
                  "localProps": {
                    "style": {
                      "background": "rgba(201,168,76,0.03)",
                      "border": "1px solid rgba(201,168,76,0.08)",
                      "borderRadius": "12px"
                    }
                  },
                  "children": [
                    {
                      "id": "bangalore_title",
                      "type": "headline",
                      "dataBindings": {},
                      "layout": {
                        "width": "fill",
                        "height": "fit",
                        "padding": "0cqmin"
                      },
                      "localProps": {
                        "tag": "h3",
                        "text": "36 Y/o Senior IT Professional,<br/>Bangalore",
                        "style": {
                          "fontSize": "14px",
                          "fontWeight": "700",
                          "textAlign": "center"
                        }
                      }
                    },
                    {
                      "id": "bangalore_donut",
                      "type": "donut-chart",
                      "dataBindings": {},
                      "layout": {
                        "width": "fill",
                        "height": "fit"
                      },
                      "localProps": {
                        "data": [
                          {
                            "label": "WealthEdge PMS",
                            "value": 30,
                            "color": "#C9A84C"
                          },
                          {
                            "label": "Stocks",
                            "value": 20,
                            "color": "#D0CFCE"
                          },
                          {
                            "label": "Bonds",
                            "value": 10,
                            "color": "#8A8A8A"
                          },
                          {
                            "label": "Cat III AIF",
                            "value": 30,
                            "color": "#606060"
                          },
                          {
                            "label": "Unlisted Equity",
                            "value": 10,
                            "color": "#444444"
                          }
                        ],
                        "showLegend": true
                      }
                    },
                    {
                      "id": "bangalore_irr_box",
                      "type": "headline",
                      "dataBindings": {
                        "text": "bangaloreIRR"
                      },
                      "layout": {
                        "width": "fill",
                        "height": "fit",
                        "padding": "0cqmin"
                      },
                      "localProps": {
                        "tag": "div",
                        "className": "bse-chart-header-pill",
                        "style": {
                          "margin": "0 auto",
                          "display": "block"
                        }
                      }
                    }
                  ]
                },
                {
                  "id": "ahmedabad_col_stack",
                  "type": "stack",
                  "layout": {
                    "width": "fill",
                    "height": "fill",
                    "direction": "column",
                    "gap": "1.5cqmin",
                    "justifyContent": "between",
                    "padding": "2cqmin"
                  },
                  "dataBindings": {},
                  "localProps": {
                    "style": {
                      "background": "rgba(201,168,76,0.03)",
                      "border": "1px solid rgba(201,168,76,0.08)",
                      "borderRadius": "12px"
                    }
                  },
                  "children": [
                    {
                      "id": "ahmedabad_title",
                      "type": "headline",
                      "dataBindings": {},
                      "layout": {
                        "width": "fill",
                        "height": "fit"
                      },
                      "localProps": {
                        "tag": "h3",
                        "text": "45 Y/o Business Owner,<br/>Ahmedabad",
                        "style": {
                          "fontSize": "14px",
                          "fontWeight": "700",
                          "textAlign": "center"
                        }
                      }
                    },
                    {
                      "id": "ahmedabad_donut",
                      "type": "donut-chart",
                      "dataBindings": {},
                      "layout": {
                        "width": "fill",
                        "height": "fit"
                      },
                      "localProps": {
                        "data": [
                          {
                            "label": "WealthEdge PMS",
                            "value": 30,
                            "color": "#C9A84C"
                          },
                          {
                            "label": "Stocks",
                            "value": 20,
                            "color": "#D0CFCE"
                          },
                          {
                            "label": "Cat III AIF (Equity)",
                            "value": 20,
                            "color": "#8A8A8A"
                          },
                          {
                            "label": "Cat I AIF (PE/VC)",
                            "value": 10,
                            "color": "#606060"
                          },
                          {
                            "label": "GIFT City AIF",
                            "value": 10,
                            "color": "#444444"
                          },
                          {
                            "label": "Unlisted Equity",
                            "value": 10,
                            "color": "#252525"
                          }
                        ],
                        "showLegend": true
                      }
                    },
                    {
                      "id": "ahmedabad_irr_box",
                      "type": "headline",
                      "dataBindings": {
                        "text": "ahmedabadIRR"
                      },
                      "layout": {
                        "width": "fill",
                        "height": "fit"
                      },
                      "localProps": {
                        "tag": "div",
                        "className": "bse-chart-header-pill",
                        "style": {
                          "margin": "0 auto",
                          "display": "block"
                        }
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "slide_35_groww_outro",
      "title": "W By Groww Outro",
      "slideType": "hero",
      "motionPreset": "luxury",
      "background": {
        "type": "gradient",
        "value": "radial-gradient(circle 350px at center, rgba(201,168,76,0.06) 0%, #05080F 70%)",
        "opacity": 1,
        "blur": 0,
        "overlayTint": "#d4af37",
        "overlayOpacity": 0.05,
        "focalPointX": 50,
        "focalPointY": 50,
        "cropMode": "cover"
      },
      "components": [
        {
          "id": "outro_stack",
          "type": "stack",
          "layout": {
            "width": "fill",
            "height": "fill",
            "direction": "column",
            "justifyContent": "center",
            "alignItems": "center",
            "gap": "2cqmin",
            "padding": "8cqmin"
          },
          "dataBindings": {},
          "children": [
            {
              "id": "outro_badge",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fit",
                "height": "fit"
              },
              "localProps": {
                "tag": "div",
                "text": "✦ Thank You",
                "className": "hero-badge"
              }
            },
            {
              "id": "outro_logo",
              "type": "headline",
              "dataBindings": {},
              "layout": {
                "width": "fit",
                "height": "fit"
              },
              "localProps": {
                "tag": "div",
                "text": "<div style='display: flex; justify-content: center; align-items: center; margin-top: 20px;'><img src='/groww-logo.png' style='width: 180px; height: 180px; object-fit: contain;' /></div>"
              }
            }
          ]
        }
      ]
    }
  ]
};

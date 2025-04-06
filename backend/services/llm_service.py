import openai
from config import config
import logging

class LLMService:
    """
    Service to handle interactions with the LLM API
    """
    
    def __init__(self):
        """
        Initialize the LLM service with configuration
        """
        openai.api_key = config['OPENAI_API_KEY']
        self.model_name = config['MODEL_NAME']
        self.max_tokens = config['MAX_TOKENS']
        self.temperature = config['TEMPERATURE']

    def _estimate_token_count(self, prompt):
        # Rough estimation: 1 token ≈ 4 characters
        return len(prompt) // 4

    
    def generate_recommendations(self, user_preferences, browsing_history, all_products):
        """
        Generate personalized product recommendations based on user preferences and browsing history
        
        Parameters:
        - user_preferences (dict): User's stated preferences
        - browsing_history (list): List of product IDs the user has viewed
        - all_products (list): Full product catalog
        
        Returns:
        - dict: Recommended products with explanations
        """
        # TODO: Implement LLM-based recommendation logic
        # This is where your prompt engineering expertise will be evaluated
        
        # Get browsed products details
        browsed_products = []
        for product_id in browsing_history:
            for product in all_products:
                if product["id"] == product_id:
                    browsed_products.append(product)
                    break
        
        # Create a prompt for the LLM
        # IMPLEMENT YOUR PROMPT ENGINEERING HERE
        prompt = self._create_recommendation_prompt(user_preferences, browsed_products, all_products)
        
        # Call the LLM API
        try:
            if self._estimate_token_count(prompt) > self.max_tokens:
                print("Prompt too long for max_tokens. Consider filtering catalog or shortening description.")

            response = openai.ChatCompletion.create(
                model=self.model_name,
                messages=[
                    {"role": "system", "content": "You are a helpful eCommerce product recommendation assistant."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=self.max_tokens,
                temperature=self.temperature
            )
            print("Raw LLM Response:", response.choices[0].message.content)

            # Parse the LLM response to extract recommendations
            # IMPLEMENT YOUR RESPONSE PARSING LOGIC HERE
            recommendations = self._parse_recommendation_response(response.choices[0].message.content, all_products)
            
            return recommendations
        
        except openai.error.RateLimitError as e:
            print(f"API rate limit exceeded: {str(e)}")
            return {"error": "API rate limit exceeded. Please try again later."}
    
        except openai.error.InvalidRequestError as e:
            print(f"Invalid request: {str(e)}")
            return {"error": "The request to the API was invalid. Please check the input parameters."}
    
        except openai.error.AuthenticationError as e:
            print(f"Authentication error: {str(e)}")
            return {"error": "Authentication failed. Please check your API key."}
    
        except openai.error.OpenAIError as e:
            print(f"OpenAI API error: {str(e)}")
            return {"error": f"An error occurred with the OpenAI API: {str(e)}"}

        except Exception as e:
            print(f"Unexpected error: {str(e)}")
            return {"error": f"An unexpected error occurred: {str(e)}"}
            
        # except Exception as e:
        #     # Handle any errors from the LLM API
        #     print(f"Error calling LLM API: {str(e)}")
        #     raise Exception(f"Failed to generate recommendations: {str(e)}")
    
    def _create_recommendation_prompt(self, user_preferences, browsed_products, all_products):
        """
        Create a prompt for the LLM to generate recommendations
        
        This is where you should implement your prompt engineering strategy.
        
        Parameters:
        - user_preferences (dict): User's stated preferences
        - browsed_products (list): Products the user has viewed
        - all_products (list): Full product catalog
        
        Returns:
        - str: Prompt for the LLM
        """
        # TODO: Implement your prompt engineering strategy
        # THIS FUNCTION MUST BE IMPLEMENTED BY THE CANDIDATE

        prompt = (
        "You are an expert product recommendation engine for an eCommerce platform.\n"
        "Your task is to recommend 5 personalized products based on:\n"
        "1. User's preferences\n"
        "2. Products they recently browsed\n"
        "3. The product catalog\n\n"
        )

        # Add user preferences to the prompt
        prompt += "User Preferences:\n"
        for key, value in user_preferences.items():
            prompt += f"- {key.capitalize()}: {value}\n"

        # Add browsing history to the prompt
        prompt += "\nBrowsing History:\n"
        if browsed_products:
            for product in browsed_products:
                features_str = ", ".join(product.get("features", []))
                tags_str = ", ".join(product.get("tags", []))
                prompt += (
                    f"- Name: {product['name']}\n"
                    f"  Brand: {product['brand']}\n"
                    f"  Category: {product['category']} > {product.get('subcategory', '')}\n"
                    f"  Price: ${product['price']}\n"
                    f"  Description: {product['description']}\n"
                    f"  Features: {features_str}\n"
                    f"  Tags: {tags_str}\n"
                    f"  Rating: {product['rating']}\n\n"
                )
        else:
            prompt += "- None\n"

        # Filter catalog down to 20 relevant products
        filtered_products = []
        for p in all_products:
            if user_preferences.get("categories") and p["category"] not in user_preferences["categories"]:
                continue
            if user_preferences.get("brands") and p["brand"] not in user_preferences["brands"]:
                continue
            if user_preferences.get("priceRange") and user_preferences["priceRange"] != "all":
                try:
                    min_price, max_price = map(float, user_preferences["priceRange"].split("-"))
                    if not (min_price <= float(p["price"]) <= max_price):
                        continue
                except Exception:
                    pass  # Ignore malformed price range
            filtered_products.append(p)
            if len(filtered_products) >= 20:
                break


        prompt += "Product Catalog (Sample of 20):\n"
        for product in filtered_products:
            prompt += (
                f"- ID: {product['id']}, Name: {product['name']}, Category: {product['category']}, "
                f"Brand: {product['brand']}, Price: ${product['price']}\n"
            )

        prompt += (
            "\nPlease recommend 5 products from the catalog that align well with the user's preferences and interests.\n"
            "Each recommendation must include:\n"
            "- product_id (from catalog)\n"
            "- explanation (why it suits the user)\n"
            "- score (confidence score out of 10)\n\n"
            "Respond in the following JSON format:\n"
            "[\n"
            "  {\n"
            "    \"product_id\": \"prod001\",\n"
            "    \"explanation\": \"This product matches the user's interest in lightweight athletic footwear.\",\n"
            "    \"score\": 9\n"
            "  },\n"
            "  ...\n"
            "]"
        )

        # You would likely want to include the product catalog in the prompt
        # But be careful about token limits!
        # For a real implementation, you might need to filter the catalog to relevant products first
        return prompt
    
        
    def _parse_recommendation_response(self, llm_response, all_products):
        """
        Parse the LLM response to extract product recommendations
        
        Parameters:
        - llm_response (str): Raw response from the LLM
        - all_products (list): Full product catalog to match IDs with full product info
        
        Returns:
        - dict: Structured recommendations
        """
        # TODO: Implement response parsing logic
        # THIS FUNCTION MUST BE IMPLEMENTED BY THE CANDIDATE

        try:
            import json
            # Find JSON content in the response
            start_idx = llm_response.find('[')
            end_idx = llm_response.rfind(']') + 1
        
            if start_idx == -1 or end_idx == 0:
                return {"recommendations": [], "error": "No valid recommendations found in LLM response."}

            json_str = llm_response[start_idx:end_idx]
            rec_data = json.loads(json_str)

            # Enrich recommendations with full product details
            recommendations = []
            for rec in rec_data:
                product_id = rec.get('product_id')
                product_details = None

                # Find the full product details
                for product in all_products:
                    if product['id'] == product_id:
                        product_details = product
                        break

                if product_details:
                    recommendations.append({
                        "product": product_details,
                        "explanation": rec.get('explanation', ''),
                        "confidence_score": rec.get('score', 5)
                    })

            return {"recommendations": recommendations, "count": len(recommendations)}

        except json.JSONDecodeError as e:
            print(f"Error parsing JSON response: {str(e)}")
            return {"recommendations": [], "error": "Error parsing the LLM response. Invalid JSON format."}
    
        except Exception as e:
            print(f"Error parsing LLM response: {str(e)}")
            return {"recommendations": [], "error": f"Failed to parse recommendations: {str(e)}"}
        

        
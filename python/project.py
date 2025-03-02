from flask import Flask, render_template, request, redirect, url_for, jsonify

from langchain_community.tools import WikipediaQueryRun
from langchain_community.utilities import WikipediaAPIWrapper
from langchain_community.llms import GooglePalm
from langchain.prompts import PromptTemplate
from langchain.llms import GooglePalm
from langchain.chains import LLMChain

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# @app.route('/code_0', methods=['POST'])
# def code_0():
#     api_key="AIzaSyCIVgLu-1lfBHFqaHXGhzxEDmq3hFrU4bw"
#     llm = GooglePalm(google_api_key=api_key,temprature=0.6)

#     print("llm loaded")

#     input = request.json.get('input')
#     language = request.json.get('language')

#     user_input = {
#         'input': input,
#         'language': language
#     }
#     print(user_input)

#     prompt_template_name = PromptTemplate(
#         input_variables=['input','language'],
#         template = "for this '{language}' and '{input}' give me the code only and nothing el  with proper indentation ; if the '{input}' is not a coding question return 'I don know'. " 
#     )
#     formatted_prompt=prompt_template_name.format(**user_input)
#     print(formatted_prompt)

#     output = llm(formatted_prompt)
#     print(output)

#     dict={}
#     dict.update({"output":output})
#     return jsonify(dict)

@app.route('/code_1', methods=['POST'])
def code_1():

    api_key = "AIzaSyCIVgLu-1lfBHFqaHXGhzxEDmq3hFrU4bw"
    temperature = 0.6
    llm = GooglePalm(google_api_key=api_key, temperature=temperature)

    print("llm loaded")

    if request.method == 'POST':
        data = request.get_json()
        input = data.get('input')
        # language = data.get('language')

        user_input = {
            'input': input,
            # 'language': language
        }

        print(user_input)

        prompt_template_items = PromptTemplate(
            input_variables=['input'],
            # template = "for this '{language}' and '{input}' give me the code only and nothing else with proper indentation ; if the '{input}' is not a coding question return 'I don't know'. " 
            template = "for this '{input}' give me the code only and nothing else with proper indentation ; if the '{input}' is not a coding question return 'I don't know'. " 
        )
        chain = LLMChain(llm=llm,prompt=prompt_template_items)
        response = chain.run(user_input)
        response = response.replace('*', '')
        print(response)
        
    return jsonify({'message': response})


@app.route('/question', methods=['POST'])
def question():

    api_key = "AIzaSyCIVgLu-1lfBHFqaHXGhzxEDmq3hFrU4bw"
    temperature = 0.5
    llm = GooglePalm(google_api_key=api_key, temperature=temperature)

    print("llm loaded")

    if request.method == 'POST':
        data = request.get_json()
        topic = data.get('topic')

        user_topic = {
            'topic': topic,
        }

        print(user_topic)

        prompt_template_items = PromptTemplate(
            input_variables=['topic'],


            template = "you can only answer coding Questions answer only in English for this '{topic}' start response by giving a 'Question' on this topic ;  seperately give 3 user input named => 'Test-Case 1', 'Test-Case 2', 'Test-Case 3' ; also seperately give 3 Outputs for the user input given earlier respectively =>  'Expected-Output 1', 'Expected-Output 2', 'Expected-Output 3'; and also give 'Hint' about question in less than 50 words; lastly give the code in python for this question by the name of 'Code :' " 
        )
        chain = LLMChain(llm=llm,prompt=prompt_template_items)
        response = chain.run(user_topic)
        response = response.replace('*', '')
        print(response)
        
    return jsonify({'message': response})


# @app.route('/code_2', methods=['POST'])
# def code_2():

#     api_key = "AIzaSyCIVgLu-1lfBHFqaHXGhzxEDmq3hFrU4bw"
#     temperature = 0.6
#     llm = GooglePalm(google_api_key=api_key, temperature=temperature)

#     print("llm loaded")

#     if request.method == 'POST':
#         input = request.json.get('input')
#         language = request.json.get('language')
#         user_input = {"input": input, "language": language}


#     prompt_template_items = PromptTemplate(
#             input_variables=['input','language'],
#             template = "for this '{language}' and '{input}' give me the code only and nothing else with proper indentation if the '{input}' is a coding question and if '{input}' is not a coding question response give 'I don't know'. " 
#             )
    
#     chain = LLMChain(llm=llm,prompt=prompt_template_items)

#     response = chain.run(user_input)

#     response = response.replace('*', '')
        
#     return jsonify({'message': response})



# @app.route('/wiki', methods=['POST'])
# def wiki_search():
#     if request.method == 'POST':
#         query = request.json.get('query')
#         api_wrapper = WikipediaAPIWrapper(top_k_results=1, doc_content_chars_max=2000)
#         tool = WikipediaQueryRun(api_wrapper=api_wrapper)

#         output = tool.run(query)+"....."
#         dict={}
#         dict["Output"]=output
#         print(dict)


#     return jsonify(dict)



if __name__ == '__main__':
    app.run(debug=True, port=8001) 

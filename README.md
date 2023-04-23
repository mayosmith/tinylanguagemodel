# tinylanguagemodel



Tiny Language Model (TLM) is a functional language model based on a small neural network that runs in your browser. It has the capability to learn and generate responses based on a six word customizable vocabulary. While very limited, it can offer insights into vastly more complex language models like ChatGPT.


TLM’s trains on a “corpus” compiled from the six-word vocabulary. This training text is like an ultra scaled down version of the millions of documents that ChatGPT trains on. TLM learns and generates responses based on the patterns it detects in the corpus.


As the Tiny Language Model trains, its weights (also called parameters) change color, providing a visual representation of how the model is learning and generating responses. This shows the inner workings of the model in real-time. By observing the changes in weight color, we can identify potential areas for improvement in the model's training and performance.


Bottom Line
“A word is characterized by the company it keeps.”—John Firth, 1957

TLM makes connections between words (also called “tokens”). It does this with weights (also called “parameters”). TLM learns that some words go together, and some don’t (anyone who’s played “Mad Libs” knows what that’s like).

There is a debate about whether weights represent knowledge and understanding— most people would say the twelve weights in TLM do not. But what happens when twelve weights are scaled up to to billions of weights? Here’s what that looks like:



Things to try
LLMs group words together (for example “New York,” “Fast Food,” and “Machine Learning”). To see how this works in Tiny Language Model try making some bigrams (two word groupings) or trigrams (three word groupings) by connecting vocabulary words with dots like this: “fast.food” “jumped.over.the”

Refresh your browser to clear the network and try training the model on the same training text. Do the model weights always look the same?

Try adding more training passes by clicking the ‘Train Tiny Language Model’ button. How do the weights change?

Try editing the training text, then retraining the model. For example change “blue cat sleeps” to “blue cat jumps.” How do the weights change? How easy is it for the model to “unlearn things?”

If you’re interested in the math, open the dev tools console in your browser. Here you can see the actual parameter values:


Limitations
Tiny Language Model has many limitations. The biggest is that it only has twelve parameters and is technically only able to handle a four word vocabulary. To make the model more interesting, vocabulary was stretched to six words by making an assumption (a hack) about word order (adjective—>noun—>verb). This assumption is loosely analogous to concepts of word embeddings and transformers.

Sources
“What Is ChatGPT Doing … and Why Does It Work?—Steven Wolfram

CS480/680 Lecture 19: Attention and Transformer Networks—Pascal Poupart

Large Language Models: Scaling Laws and Emergent Properties

GPT Technical Report

Word Embedding

ChatGPT helped code Tiny Language Model and edit this readme file.


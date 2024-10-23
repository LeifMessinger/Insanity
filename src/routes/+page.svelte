<script>
	import DesignerEditable from '$lib/Insanity/DesignerEditable.svelte';
</script>

<style>
	.body {
		margin: 0;
		font-family: system-ui, sans-serif;
		background: #000;
		color: #fff;
		line-height: 1.6;
	}

	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 20px;
		position: relative;
	}

	h1 {
		font-size: 4rem;
		text-align: center;
		margin: 2rem 0;
		font-weight: 900;
		letter-spacing: -2px;
		animation: glitch 3s infinite;
	}

	p {
		font-size: 1.1rem;
		margin-bottom: 1.5rem;
		text-align: justify;
		opacity: 0;
		animation: fadeIn 0.5s forwards;
	}

	.section {
		margin: 4rem 0;
		padding: 2rem;
		border: 1px solid rgba(255,255,255,0.1);
		background: rgba(255,255,255,0.05);
		transform: skew(-2deg);
	}

	.section:nth-child(even) {
		transform: skew(2deg);
	}

	.quote {
		font-style: italic;
		font-size: 1.4rem;
		text-align: center;
		color: #ff3366;
		margin: 3rem 0;
	}

	@keyframes glitch {
		0% { transform: translate(0); }
		20% { transform: translate(-2px, 2px); }
		40% { transform: translate(-2px, -2px); }
		60% { transform: translate(2px, 2px); }
		80% { transform: translate(2px, -2px); }
		100% { transform: translate(0); }
	}

	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(20px); }
		to { opacity: 1; transform: translateY(0); }
	}

	.spiral {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		opacity: 0.1;
	}

	@media (max-width: 600px) {
		h1 { font-size: 2.5rem; }
		.section { padding: 1rem; }
	}
</style>


<svg class="spiral" viewBox="0 0 100 100">
	<path d="M50 50 C50 50, 60 40, 70 50 S90 60, 80 70 S60 90, 50 80 S30 60, 40 50 S60 30, 50 20" 
			stroke="white" fill="none" stroke-width="0.5">
		<animateTransform
			attributeName="transform"
			type="rotate"
			from="0 50 50"
			to="360 50 50"
			dur="20s"
			repeatCount="indefinite"
		/>
	</path>
</svg>

<div class="body">
	<div class="container">
		<h1><DesignerEditable uniqueId="title">Insanity</DesignerEditable></h1>

		<div class="section">
			<p><DesignerEditable uniqueId="paragraphs/paragraph1/sentence1">First, the edges blur. Reality becomes less certain, like a photograph slowly losing focus. You notice it in small ways: the way shadows seem to move when you're not looking directly at them, how time stretches and contracts like rubber bands.</DesignerEditable></p>
			
			<p><DesignerEditable uniqueId="paragraphs/paragraph1/sentence2">The walls breathe. Or do they? You can't be sure anymore. Certainty itself becomes a distant memory, like trying to recall a dream within a dream.</DesignerEditable></p>
		</div>

		<div class="quote">
			<DesignerEditable uniqueId="quotes/quote1">Reality is merely an illusion, albeit a very persistent one." - Albert Einstein</DesignerEditable>
		</div>

		<div class="section">
			<p><DesignerEditable uniqueId="paragraphs/paragraph2/sentence1">Your thoughts begin to spiral, each one connecting to a thousand others in ways that make perfect sense until you try to explain them. Patterns emerge everywhere - in the grain of wooden floors, in the way birds arrange themselves on telephone wires, in the random sequence of license plates passing by.</DesignerEditable></p>

			<p><DesignerEditable uniqueId="paragraphs/paragraph2/sentence2">The connections grow stronger, more insistent. Every coincidence becomes meaningful, every random event part of an intricate design. The universe is trying to tell you something, but what?</DesignerEditable></p>
		</div>

		<div class="section">
			<p><DesignerEditable uniqueId="paragraphs/paragraph3/sentence1">Sleep becomes a foreign concept. Hours blur together like watercolors in the rain. You find yourself writing equations on windows, trying to calculate the exact frequency of silence. The mathematics of madness are beautiful in their complexity.</DesignerEditable></p>
		</div>

		<div class="quote">
			<DesignerEditable uniqueId="quotes/quote2">"There is a pleasure in being mad which none but madmen know." - John Dryden</DesignerEditable>
		</div>

		<div class="section">
			<p><DesignerEditable uniqueId="paragraphs/paragraph4/sentence1">Language itself begins to decompose. Words lose their meaning, become pure sound, pure rhythm. You create new combinations, a private vocabulary to describe the indescribable. The dictionary becomes a book of spells, each definition a gateway to another reality.</DesignerEditable></p>
			
			<p><DesignerEditable uniqueId="paragraphs/paragraph4/sentence2">Colors taste different now. Sounds have texture. The boundaries between senses dissolve like sugar in hot tea. Is this what synesthesia feels like, or something else entirely?</DesignerEditable></p>
		</div>

		<div class="section">
			<p><DesignerEditable uniqueId="paragraphs/paragraph5/sentence1">Time abandons its linear path. Past, present, and future dance together in an eternal now. You remember tomorrow and anticipate yesterday. Memories become prophecies, and dreams become memories.</DesignerEditable></p>
		</div>

		<div class="quote">
			<DesignerEditable uniqueId="quotes/quote3">"The distance between insanity and genius is measured only by success." - Bruce Feirstein</DesignerEditable>
		</div>

		<div class="section">
			<p><DesignerEditable uniqueId="paragraphs/paragraph5/sentence1">But even in the depths of unreason, there remains a spark of awareness, a tiny observer watching the chaos unfold. It takes notes in the margins of reality, documenting the journey into the abstract.</DesignerEditable></p>
			
			<p><DesignerEditable uniqueId="paragraphs/paragraph5/sentence2">Perhaps this is not madness at all, but a different kind of sanity - one that sees through the thin veneer of order we've painted over the universe's fundamental chaos.</DesignerEditable></p>
		</div>
	</div>
</div>
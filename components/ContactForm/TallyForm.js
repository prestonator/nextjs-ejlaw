const GoogleForm = () => (
	<div className="tally-iframe">
		<iframe
			data-tally-src="https://tally.so/embed/w7LBza?hideTitle=1&dynamicHeight=1"
			loading="lazy"
			width="100%"
			height="648"
			title="Free Consultation"
		></iframe>

		<script
			dangerouslySetInnerHTML={{
				__html: `
      var d = document,
        w = "https://tally.so/widgets/embed.js",
        v = function() {
          if (typeof Tally !== "undefined") {
            Tally.loadEmbeds();
          } else {
            d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach(function(e) {
              e.src = e.dataset.tallySrc;
            });
          }
        };

      if (typeof Tally !== "undefined") {
        v();
      } else if (d.querySelector('script[src="' + w + '"]') == null) {
        var s = d.createElement("script");
        s.src = w; 
        s.onload = v;
        s.onerror = v;
        d.body.appendChild(s);
      }
    `,
			}}
		/>
	</div>
);

export default GoogleForm;

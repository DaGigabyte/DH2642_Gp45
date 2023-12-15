## Using global loader as suspense

import the global loader from component to your component where you want to use suspense, then:
``<div className="relative">
<SuspensAnimation loading={?} />

</div>``

Your container where you use suspense should have class "relative", otherwise the suspense, adjust itself to the nearest relative container, if does not exist, the body.
